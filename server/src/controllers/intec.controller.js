const axios = require('axios')
const cheerio = require('cheerio')
const {
    intec
} = require('../../config').Urls

module.exports = {
    call: () => {
        return new Promise(async (resolve, reject) => {
            let array = []
            try {
                const {
                    status,
                    data
                } = await axios.get(intec.jobs_url)
                if (status === 200 && data) {
                    const $ = cheerio.load(data)
                    $("#tm-main")
                        .find(".uk-panel-box")
                        .each((index, elem) => {
                            array.push({
                                position: $(elem).find(".uk-link-reset").text().trim(),
                                description: $(elem).find(".uk-margin").text().trim(),
                                place: 'Intec',
                                due_date: 'n/a',
                                available_jobs: '1',
                                type: 'n/a',
                                domain_url: intec.jobs_url,
                                details_url: `${intec.domain_url}${$(elem).find('.uk-button').attr('href')}`
                            })
                        })
                    resolve(array)
                }
            } catch (ex) {
                reject(ex)
            }
        })
    }
}