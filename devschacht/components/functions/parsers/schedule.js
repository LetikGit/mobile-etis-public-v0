const axios = require("axios");
const { ETIS_DEFAULT_URL } = require('../../../const/index')
const convertToReadable = require("../convert");
const cheerio = require('react-native-cheerio')
const { ETIS_ROUTES } = require("../../../const");

/**
 * Получаем расписание текущей недели
 *
 * @param {string} session - сессия
 * @returns {
 *     result: {boolean},
 *     error_msg: {string}, // if result: 0
 *     scheduleData: {array} { // if result: 1
 *          {object}: { - объект дисциплины из триместра
 *              title: {string} - день недели и дата (прим: Понедельник, 19 апреля),
 *              weekday: {number} - номер недели (начинается с 1),
 *              pairs: {array} - массив пар за день
 *                    {object} - объект пары
 *                          pair_num: {string} - номер пары (начинается с 1),
 *                          pair_time: {string} - начало пары,
 *                          pair_teacher: {string} - преподаватель,
 *                          pair_dis: {string} - название дисциплины
 *                          pair_aud: {string} - номер аудитории
 *          }
 *     }
 * }
 */

const schedule = async (session) => {
    let data = {};
    await axios.get(`${ETIS_ROUTES.ETIS_TIMTABLE_URL}`, {
        headers: {
            Cookie: `session_id=${session}`
        },
    }).then(async response => {
        const pageHtml = response.data
        $ = cheerio.load(pageHtml)

        let selected_week = ''

        if ($('#form').attr('action')) {
            return { result: 0, error_msg: 'Session is invalid.' }
        }

        if ($('.current').text()) {
            selected_week = $('.current').text().trim()
        } else {
            selected_week = $('.week').first().find('a').text()
        }

        let url = 'https://student.psu.ru/pls/stu_cus_et/stu.timetable?p_cons=y&p_week=' + selected_week

        await axios.get(url, {
            headers: {Cookie: `session_id=${session}`},
        }).then(response => {
            const pageHtml = response.data
            $ = cheerio.load(pageHtml)

            let dataFull = []
            let week = []
            let week_periods = []

            $('.week').map((day, elem) => {
                let tmp = $(elem).find('a').text()

                if (tmp === '') {
                    tmp = $(elem).text()
                }

                week_periods.push({
                    week: tmp.trim()
                })
            })

            let week_data = {
                start: $('.week-select').find('span').text().match(/(0[1-9]|[12][0-9]|3[01])[-.]\d\d/g)[0],
                end: $('.week-select').find('span').text().match(/(0[1-9]|[12][0-9]|3[01])[-.]\d\d/g)[1],
                week: selected_week
            }

            $('.day').map((day, elem) => {

                let dayInfo = {}
                dayInfo.title = $(elem).find('h3').text()
                dayInfo.weekday = day + 1
                let pairs = []
                let pairCount = 0;

                $(elem).find('tr').each((i, tr) => {

                    if ($(tr).find('td.pair_info .dis').length) {

                        for (let counter = 0; counter < $(tr).find('td.pair_info .dis').length; counter++) {

                            let pair_num = $(tr).find('td.pair_num').text().slice(0, 1)
                            let pair_time = $(tr).find('td.pair_num .eval').text()
                            let pair_teacher = $(tr).find(`td.pair_info .teacher`).eq(counter).find('a').text().replace('оценить занятие', '')
                            let pair_dis = $(tr).find(`td.pair_info .dis`).eq(counter).text().trim()
                            let pair_aud = $(tr).find(`td.pair_info .aud`).eq(counter).text()

                            if (pair_dis !== '') {

                                let pair = {
                                    pair_num,
                                    pair_time,
                                    pair_teacher,
                                    pair_dis,
                                    pair_aud
                                }

                                pairs.push(pair)
                                pairCount = i + 1
                            }

                        }
                    }
                })

                if (pairs.length === 0)
                    pairCount = 0

                dayInfo.pairs = pairs
                dayInfo.pairsCount = pairCount

                week.push(dayInfo)
            })

            dataFull = week

            data = {
                scheduleData: dataFull,
                week_periods,
                selectedItem: week_data
            }

        })
    })
    return data;
}

module.exports = schedule
