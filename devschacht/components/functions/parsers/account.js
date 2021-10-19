const axios = require("axios");
const cheerio = require('react-native-cheerio')
const ETIS_PAGE_SELECTORS = require("../../selectors");
const {ETIS_ROUTES} = require("../../../const");

const account = async (session) => {
    let studentData;

    await axios.get(ETIS_ROUTES.ETIS_DEFAULT_URL, {
        headers: {
            Cookie: `session_id=${session}`
        },
    })
        .then(response => {
            const pageHtml = response.data//convertToReadable(response.data)
            $ = cheerio.load(pageHtml)
            if ($('#form').attr('action')) {
                return { result: 0, error_msg: 'Session is invalid.' }
            }


            const headerStudentData = ETIS_PAGE_SELECTORS.studentHeaderData($)
            const fullname = headerStudentData[0].split("(")[0].trim()
            const birthday = headerStudentData[0].split("(")[1].split(" ")[0]
            const specialization = headerStudentData[1].trim()
            const studyType = headerStudentData[2].trim()
            const studyStartedYear = headerStudentData[3].trim()
            const missingClassesCount = $('.span3 li').find('a[href="stu.absence"]').text().trim().match(/\((.+?)\)/) ? parseInt($('.span3 li').find('a[href="stu.absence"]').text().trim().match(/\((.+?)\)/)[1]) : (parseInt($('.span3 li').find('a[href="stu.absence"] .badge').text()) || 0)
            const anonceCount = parseInt($('.span3 li').find('a[href="stu.stu.announce"] .badge').text()) || 0
            const msgCount = parseInt($('.span3 li').find('a[href="stu.teacher_notes"] .badge').text()) || 0

            studentData = {
                fullname,
                birthday,
                specialization,
                studyType,
                studyStartedYear,
                missingClassesCount,
                anonceCount,
                msgCount
            }
        })
        .catch((err) => {
            console.error(err)
        })

    return studentData
}

module.exports = account
