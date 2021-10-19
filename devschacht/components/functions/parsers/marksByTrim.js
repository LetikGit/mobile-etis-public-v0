const axios = require("axios");
const { ETIS_DEFAULT_URL } = require('../../../const/index')
const convertToReadable = require("../convert");
const cheerio = require('react-native-cheerio')
const { ETIS_ROUTES } = require("../../../const");

/**
 * Получаем информацию об оценках за контрольные точки по номеру триместра
 *
 * @param {string} session - сессия
 * @param {number} trim - номер триместра, за который хотим посмотреть оценки
 * @returns {
 *     result: {boolean},
 *     error_msg: {string}, // if result: 0
 *     disciplines: {array} { // if result: 1
 *          {object}: { - объект дисциплины из триместра
 *              name: {string} - название дисциплины,
 *              marks: {array} - массив контрольный точек за дисциплину,
 *                    {object} - объект контрольной точки
 *                          name: {string} - название контрольной точки,
 *                          now: {string} - текущая оценка за КТ,
 *                          min: {string} - минимальная (проходная) оценка за КТ,
 *                          max: {string} - максимальный балл за КТ
 *          }
 *     }
 * }
 */


const marksByTrim = async (session, trimNumber) => {
    let data;
    await axios.get(`${ETIS_ROUTES.ETIS_MARKS_URL}?p_mode=current&p_term=${trimNumber}`, {
        headers: {
            Cookie: `session_id=${session}`
        },
    }).then(response => {
            const pageHtml = response.data
            $ = cheerio.load(pageHtml)
            let disciplines = []

            if ($('#form').attr('action')) {
                return { result: 0, error_msg: 'Session is invalid.' }
            }

            $('h3').map((i, elem) => {
                let dis = $(elem).text().trim()
                if ($(elem).next().find('td.superBetterTooltip').attr('data-url')) {
                    disciplines.push({
                        name: dis,
                        marks: []
                    })
                }
            })


            let index = -1
            $('.common').map((i, elem) => {
                let ktList = []
                let markListOneDis = {}

                if ($(elem).find('tr').length > 2) {
                    index++
                    $(elem).find('td.superBetterTooltip').each(function(ind, tr) {
                        let name = $(tr).parent().find('td:first-child').text()
                        let now = $(tr).text()
                        let min = $(tr).parent().find('td:nth-child(5)').text()
                        let max = $(tr).parent().find('td:nth-child(7)').text()

                        disciplines[index].marks.push({
                            name,
                            now,
                            min,
                            max,
                        })
                    })
                }
            })
            data = disciplines;
        })
    return data;
}

module.exports = marksByTrim
