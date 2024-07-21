import axios from "axios";

class ReservationService {

  static getReservations = async (url, auth, email) => {
    const response = await axios.get(url,{
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static getReservation = async (url, auth, email) => {
    const response = await axios.get(url, {
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static deleteReservation = async (url, auth, email) => {
    const response = await axios.delete(url, {
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static updateReservation = async (url, reservation, auth, email) => {
    const response = await axios.put(url, reservation, {
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }

  static createReservation = async (url, reservation, auth, email) => {
    const response = await axios.post(url, reservation, {
      headers: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': auth,
      },
    });
    return response.data;
  }
}

export default ReservationService;