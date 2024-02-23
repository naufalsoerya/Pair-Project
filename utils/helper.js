const Helper = {
    formatDate: (value) => {
        return value.toLocaleString('id-ID', {dateStyle: 'long'})
    },
    formatNumb: (value) => {
        return value.toLocaleString()
    }
}

module.exports = Helper