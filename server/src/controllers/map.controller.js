const axios = require('axios')
const cheerio = require('cheerio')
const {
    map
} = require('../../config').Urls

module.exports = {
    call: () => {
        return new Promise(async (resolve, reject) => {
            let array = []
            try {
                const {
                    status,
                    data
                } = await axios.get(map.jobs_url)
                if (status === 200 && data) {
                    const $ = cheerio.load(data)
                    $("#ctl00_MainContent_gvPlazasVigentes")
                        .find("tr:not(.hero-unit)")
                        .each((index, elem) => {
                            array.push({
                                position: $(elem).find("td").eq(3).text().trim(),
                                place: $(elem).find("td").eq(4).text().trim(),
                                due_date: $(elem).find("td").eq(5).text().trim(),
                                available_jobs: $(elem).find("td").eq(6).text().trim(),
                                type: $(elem).find("td").eq(7).text().trim(),
                                domain_url: map.jobs_url
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