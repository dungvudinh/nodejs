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
    sortable(fieldname, sort) {
        // const sortType = fieldname === sort.col ? sort.type : 'default';
        const sortType = fieldname === sort.col ? sort.type : 'default';
        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-arrow-up-short-wide ',
            desc: 'fa-solid fa-arrow-up-wide-short',
        };
        const types = {
            default: 'desc',
            desc: 'asc',
            asc: 'desc',
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(
            `?_sort&col=${fieldname}&type=${type}`,
        );
        const result = `  
        <a href=${href}>
            <i class="${icon}"></i>
        </a>`;
        return new Handlebars.SafeString(result);
    },
    renderPage(count, currentPage)
    {
        var result = '';
        const page = Math.ceil(count/8);

        if(page > 1)
        {
            var  showPage = '';
            for(let i = 0; i< page; i++)
                {
                   showPage += `<li class="page-item"><a class="page-link" href="?page=${i+1}">${i+1}</a></li>`;
                }
            if(page  ==1)
            {
                result = `
                    <ul class="pagination justify-content-center">
                    ${showPage}
                    </ul>
                `;
            }
            else 
            {
                result = `
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
             ${showPage}
             ${currentPage === page ? 
                ''
                :
             '<li class="page-item"> <a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>'
            }
         </li>
            </ul>`;
            }
            
        }
        return new Handlebars.SafeString(result);
    }
};
