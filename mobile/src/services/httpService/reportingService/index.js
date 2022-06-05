import { http } from '../index';

class ReportingService {

    sendLocation = async (location) => {
        const result = await http.post(`/api/user/sendLocation`, {
            location: location,
        })
        return result.data
    }

    sendIssueReport = async (text,image,location) => {
        const result = await http.post(`/api/user/sendReport`, {
            text,
            image,
            location
        })
        return result.data
    }
}

export default new ReportingService();
