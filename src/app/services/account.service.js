const query = require('../../config/db/backend');
const bcrypt = require('bcrypt');
class AccountService
{
    async create(data, callback) 
    {
        
        await query("SELECT email from account WHERE  email = ?", [data.email], async (err, result)=>{
            var error = {name: '', email: '', password: ''};
            if(result.length > 0)
            {
                error.email = 'Email already exist';
                return callback(error);
            }
            else if(data.password.length <6)
            {
                error.password = 'minimum password length is 6 characters';
                return callback(error);
            }
            const salt =  await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(data.password, salt);
            query('INSERT INTO account(name, email, password) VALUES(?, ?, ?)' , [data.name, data.email, newPassword], (err,result)=>{
                if(err)  return callback(err);
                return callback(null, result);
            })
        })
    }
    async login({email, password}, callback)
    {
        await query("SELECT account_id, password FROM account WHERE email  = ?", [email], (err, result)=>
        {
            if(result.length > 0)
            {
                const [user] = result;
                const auth  = bcrypt.compare(password, user.password);
                if(auth) return callback(null, user);
                return callback('Incorrect password');
            }
            return callback('Incorrect email');
        })
    }
}

module.exports = new AccountService();