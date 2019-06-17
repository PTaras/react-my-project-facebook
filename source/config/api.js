// Core
import { getFullApiUrl } from 'instruments';

const GROUP_ID = 'qi6mqple8zsy';
const TOKEN = 'm8uve23yld';
const url = 'https://lab.lectrum.io/react/api';
const api = getFullApiUrl(url, GROUP_ID);

export { GROUP_ID, TOKEN, api, url };
