const frontQuery = require('../../config/db/frontend');
const backQuery = require('../../config/db/backend');
const tableQuery = require('../../config/db/tableQuery');
class APIController
{
    async getAllUser(req, res, next)
    {
        const data  = await frontQuery('SELECT id, nick_name, full_name FROM user');
        res.send(data);
    }
    async getCapVideo(req, res,next)
    {
        const data = await tableQuery("SELECT COUNT(*)  AS NOFTable FROM INFORMATION_SCHEMA.TABLES WHERE  TABLE_SCHEMA = 'tiktok-video'")
        res.send(data);
    }
}

module.exports  = new APIController();