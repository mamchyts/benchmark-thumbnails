import http from 'k6/http';
import { Trend } from 'k6/metrics';


// list of all valid routes
const routes = {
    'imgproxy': {
        '320x240': 'http://localhost:8080/insecure/rs:fill:320:240/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8080/insecure/rs:fill:854:480/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8080/insecure/rs:fill:1280:720/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8080/insecure/rs:fill:1920:1080/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8080/insecure/rs:fill:3840:2160/el:true/g:ce:0:0/plain/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'imaginary': {
        '320x240': 'http://localhost:8081/enlarge?width=320&height=240&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8081/enlarge?width=854&height=480&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8081/enlarge?width=1280&height=720&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8081/enlarge?width=1920&height=1080&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8081/enlarge?width=3840&height=2160&url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'thumbor': {
        '320x240': 'http://localhost:8082/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8082/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8082/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8082/unsafe/1920x1080/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8082/unsafe/3840x2160/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
    },
    'thumbor_cache': {
        '320x240': 'http://localhost:8083/unsafe/320x240/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8083/unsafe/854x480/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8083/unsafe/1280x720/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8083/unsafe/1920x1080/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8083/unsafe/3840x2160/https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.',
    },
    'picfit': {
        '320x240': 'http://localhost:8084/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8084/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8084/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8084/display?w=1920&h=1080&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8084/display?w=3840&h=2160&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
    },
    'picfit_cache': {
        '320x240': 'http://localhost:8085/display?w=320&h=240&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8085/display?w=854&h=480&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8085/display?w=1280&h=720&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8085/display?w=1920&h=1080&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8085/display?w=3840&h=2160&op=thumbnail&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmamchyts%2Fbenchmark-thumbnails%2Fmaster%2Fpexels-magda-ehlers.jpg',
    },
    'imageproxy': {
        '320x240': 'http://localhost:8086/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8086/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8086/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8086/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8086/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'imageproxy_cache': {
        '320x240': 'http://localhost:8087/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8087/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8087/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8087/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8087/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'weserv': {
        '320x240': 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=320&h=240&fit=cover',
        '854x480': 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=854&h=480&fit=cover',
        '1280x720': 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1280&h=720&fit=cover',
        '1920x1080': 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1920&h=1080&fit=cover',
        '3840x2160': 'http://localhost:8088/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=3840&h=2160&fit=cover',
    },
    'weserv_cache': {
        '320x240': 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=320&h=240&fit=cover',
        '854x480': 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=854&h=480&fit=cover',
        '1280x720': 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1280&h=720&fit=cover',
        '1920x1080': 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=1920&h=1080&fit=cover',
        '3840x2160': 'http://localhost:8089/?url=https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg&w=3840&h=2160&fit=cover',
    },
    'flyimg': {
        '320x240': 'http://localhost:8090/upload/w_320,h_240,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8090/upload/w_854,h_480,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8090/upload/w_1280,h_720,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8090/upload/w_1920,h_1080,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8090/upload/w_3840,h_2160,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'flyimg_cache': {
        '320x240': 'http://localhost:8091/upload/w_320,h_240,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8091/upload/w_854,h_480,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8091/upload/w_1280,h_720,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8091/upload/w_1920,h_1080,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8091/upload/w_3840,h_2160,c_1/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'mort': {
        '320x240': 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=320&height=240',
        '854x480': 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=854&height=480',
        '1280x720': 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1280&height=720',
        '1920x1080': 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1920&height=1080',
        '3840x2160': 'http://localhost:8092/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=3840&height=2160',
    },
    'mort_cache': {
        '320x240': 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=320&height=240',
        '854x480': 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=854&height=480',
        '1280x720': 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1280&height=720',
        '1920x1080': 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=1920&height=1080',
        '3840x2160': 'http://localhost:8093/query/pexels-magda-ehlers.jpg?operation=crop&gravity=center&width=3840&height=2160',
    },
    'imagor': {
        '320x240': 'http://localhost:8094/unsafe/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8094/unsafe/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8094/unsafe/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8094/unsafe/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8094/unsafe/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
    'imagor_cache': {
        '320x240': 'http://localhost:8095/unsafe/320x240/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '854x480': 'http://localhost:8095/unsafe/854x480/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1280x720': 'http://localhost:8095/unsafe/1280x720/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '1920x1080': 'http://localhost:8095/unsafe/1920x1080/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
        '3840x2160': 'http://localhost:8095/unsafe/3840x2160/https://raw.githubusercontent.com/mamchyts/benchmark-thumbnails/master/pexels-magda-ehlers.jpg',
    },
};


// init custom metrics
let trends = {}
for (const project in routes) {
    trends[project] = {};
    for (const size in routes[project]) {
        trends[project][size] = new Trend(`latency_${project}_${size}`, true);
    }
}


// init scenarios
let i = 0;
let duration = 60;
let gracefulStop = 60;
let scenarios = {}
for (const project in routes) {
    for (const size in routes[project]) {
        i++;

        scenarios[`${project}_${size}`] = {
            executor: 'constant-arrival-rate',

            duration: `${duration}s`, // How long the test lasts
            preAllocatedVUs: 1, // Pre-allocate VUs before starting the test
            maxVUs: 1, // Maximum number of VUs to allow during the test run
            rate: 1, // How many iterations per timeUnit
            timeUnit: '1s', // Start `rate` iterations per second
            gracefulStop: `${gracefulStop}s`, // A period at the end of the test in which k6 lets iterations in progress finish

            startTime: `${(duration + gracefulStop) * (i - 1)}s`,
            exec: 'run',
            env: {
                URI: routes[project][size],
                PROJECT: project,
                SIZE: size,
            },
        };
    }
}


export const options = {
    discardResponseBodies: true,
    scenarios: scenarios,
};


export function run() {
    const response = http.get(__ENV.URI.replace('http://localhost', __ENV.HOST));

    // update custom metrics
    trends[__ENV.PROJECT][__ENV.SIZE].add(response.timings.duration);
}
