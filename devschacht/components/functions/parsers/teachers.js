const axios = require("axios");
const cheerio = require('react-native-cheerio')
const { ETIS_ROUTES } = require("../../../const");

/**
 * Получаем информацию о списке преподавателей
 *
 * @param {string} session - сессия
 * @returns {
 *     result: {boolean},
 *     error_msg: {string}, // if result: 0
 *     teachers: {array} { // if result: 1
 *      {object}
 *         name: {string} - имя преподавателя,
 *         avatar_url: {string} - ссылка на фотографию,
 *         cafedra: {string} - кафедра преподавателя,
 *         discipline: {string} - дисциплина, которую преподаватель ведет
 *     }
 * }
 */

const teachers = async (session) => {
    let data = [];

    await axios.get(ETIS_ROUTES.ETIS_TEACHERS_URL, {
        headers: {
            Cookie: `session_id=${session}`
        },
    }).then(response => {
            const pageHtml = response.data
            $ = cheerio.load(pageHtml)

            if ($('#form').attr('action')) {
                return { result: 0, error_msg: 'Session is invalid.' }
            }

            let teachersList = []

            $('.teacher_info').each(function() {
                teachersList.push({
                    name: $(this).find('.teacher_name').text().trim(),
                    avatar_url: 'https://student.psu.ru/pls/stu_cus_et/' + $(this).find('.teacher_photo img').attr("src"),
                    cafedra: $(this).find('.chair').text().trim(),
                    discipline: $(this).find('.dis').text().trim()
                })
            })
            console.log(teachersList)
            data = teachersList
    })
    return data;
}

module.exports = teachers
