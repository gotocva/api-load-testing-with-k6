import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },  // Ramp up to 10 users in 10s
    // { duration: '30s', target: 50 },  // Stay at 50 users for 30s
    // { duration: '10s', target: 0 },   // Ramp down to 0 users in 10s
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/api/v1/users');
  
  check(res, {
    'sample': (r) => {

      console.log(r.status, r.timings); 
      return true
    },
    'is status 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Pause for 1 second before the next request
}
