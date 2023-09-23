const query = require('../../config/db/backend');
class CourseService{
    async getAllCourses(limit, skip){
        try 
        {
            const sql  = 'SELECT * FROM course LIMIT ? OFFSET ?';
            const valueTransfer = [limit, skip];
            const data = await query(sql, valueTransfer);
            return data;
        }
        catch(err)
        {
            throw new Error(err);
        }
    }
    async getNOFCourse()
    {
        try 
        {
            const data = await query('SELECT COUNT(*) FROM course');
            return data;
        }
        catch(err)
        {
            throw new Error(err);
        }
    }
}

module.exports = new CourseService();