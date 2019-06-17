// Core
import { getFullApiUrl } from 'instruments';

const GROUP_ID = 'qi6mqple8zsy';
const POST_ID = 'gii6rwuefb';
const TOKEN = 'm8uve23yld';
const url = 'https://lab.lectrum.io/react/api';
const api = getFullApiUrl(url, GROUP_ID, POST_ID);

export { POST_ID, GROUP_ID, TOKEN, api, url };
