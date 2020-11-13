import * as mysql from 'mysql';
import config from '../config';
import uva_student from './uva_student';
//every table gets imported here

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => { //something wrong with connection
    if(err) console.log(err)
});

//every time export
export default {
    uva_student    
}