const { Router } = require('express');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { wrapAsync } = require('../../util');

const router = Router();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

router.get('/', wrapAsync(async (req, res) => {
    const now = dayjs().tz('Asia/Seoul').format('HH:mm:ss');
    console.log(now)
    res.json({
        data: now
    })
}));

module.exports = router;