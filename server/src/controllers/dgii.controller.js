const axios = require('axios')
const cheerio = require('cheerio')
const {
    dgii
} = require('../../config').Urls

module.exports = {
    call: () => {
        return new Promise(async (resolve, reject) => {
            let array = []
            try {
                const {
                    status,
                    data
                } = await axios.get(dgii.jobs_url)
                if (status === 200 && data) {
                    const $ = cheerio.load(data)
                    $("#ofertas")
                        .find("tr:not(:first-child)")
                        .each((index, elem) => {
                            array.push({
                                position: $(elem).find("td").eq(1).text().trim(),
                                description: 'n/a',
                                place: $(elem).find("td").eq(2).text().trim(),
                                due_date: 'n/a',
                                available_jobs: '1',
                                type: 'n/a',
                                domain_url: dgii.jobs_url,
                                details_url: $(elem).find("td").eq(1).find('a').attr('onclick'),
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