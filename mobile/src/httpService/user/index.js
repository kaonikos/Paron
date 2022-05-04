import { http } from '../index';

class UserService {

    getUserData = async (id) => {
        const result = await http.post(`/api/user/getUserData`, {
            user_id: id,
        })
        return result.data
    }
}

export default new UserService();