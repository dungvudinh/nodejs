const Handlebars = require('handlebars');
module.exports = {
    sum(a, b) {
        return a + b;
    },
    timeFormat(timestamp) {
        return `${timestamp.getHours()}:${timestamp.getMinutes()} - ${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`;
    },
    dataWhatever(title, id) {
        return JSON.stringify({ title, id });
    },
    sortable(fieldname, sort)
    {
        // const sortType = fieldname === sort.col ? sort.type : 'default';
        const sortType = fieldname === sort.col ? sort.type : 'default';
        const icons = {
            default: 'fa-solid fa-sort', 
            asc: 'fa-solid fa-arrow-up-short-wide ', 
            desc: 'fa-solid fa-arrow-up-wide-short'
        }
        const types = {
            default:'desc', 
            desc: 'asc', 
            asc: 'desc'
        }
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(`?_sort&col=${fieldname}&type=${type}`);
        const result = `  
        <a href=${href}>
            <i class="${icon}"></i>
        </a>`
        return new Handlebars.SafeString(result);
    }
}