const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const { Router } = require('express');
const { wrapAsync } = require('../util');
const pool = require('../db');
const router = Router();
const NOBUS = '버스가 없습니다.';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');


router.get('/', wrapAsync(async (req, res) => {
    const conn = await pool.getConnection();
    const now = dayjs().tz('Asia/Seoul').format('HH:mm:ss');
    const today = dayjs().tz('Asia/Seoul').format('YYYYMMDD');
    const week = dayjs().tz('Asia/Seoul').format('ddd');
    
    const getData = async (table, order) => {
        const [ rows ] = await conn.query(
            `SELECT * 
             FROM ${table} 
             WHERE arrive >= '${now}' 
             ORDER BY ${order} ASC
             LIMIT 1 `
        );
        if (rows.length == 0)
        return NOBUS;
        const gap = parseInt(dayjs('2000-01-01 ' + rows[0].arrive).diff(dayjs('2000-01-01 ' + now), 'minutes'));
        const diff = gap >= 0 ? gap : -1;
        if (0 > diff)
            return NOBUS;
        else if (2 > diff)
            return '잠시 후 도착';
        else
            return `${diff}분 후 도착`;
    }

    // 휴일 여부
    const [ legalHoliday ] = await conn.query(`SELECT * FROM holiday WHERE locdate = ${today}`);
    const isHoliday = (week === 'Sun' || week === 'Sat' || legalHoliday.length) ? true : false

    // 셔틀 버스
    const [ shuttle_university, shuttle_domitory, shuttle_beomeosa, shuttle_namsan, shuttle_fire ] =
        isHoliday ? [NOBUS, NOBUS, NOBUS, NOBUS, NOBUS]
        : await Promise.all([
            getData('shuttle_university', 'arrive'),
            getData('shuttle_domitory', 'arrive'),
            getData('shuttle_beomeosa', 'arrive'),
            getData('shuttle_namsan', 'arrive'),
            getData('shuttle_fire', 'arrive')
        ]);
    
    // 마을 버스
    const hTable = isHoliday ? '_holiday' : '';
    const [ town_guseo_bufs, town_bufs_namsan, town_namsan_bufs, town_bufs_guseo ] =
        await Promise.all([
            getData('town_guseo_bufs' + hTable, 'arrive'),
            getData('town_bufs_namsan' + hTable, 'arrive'),
            getData('town_namsan_bufs' + hTable, 'arrive'),
            getData('town_bufs_guseo' + hTable, 'arrive')
        ]);

    // 301번 버스
    const timeFormat = (rows) => rows.length && rows[0].min1 ? rows[0].min1 + '분 후 도착' : NOBUS;
    const city_guseo = timeFormat((await conn.query(`SELECT * FROM city_301 WHERE bus_stop='guseo'`))[0]);
    const city_nopo = timeFormat((await conn.query(`SELECT * FROM city_301 WHERE bus_stop='nopo'`))[0]);
    conn.release();
    res.json({
        shuttle_university,
        shuttle_domitory,
        shuttle_beomeosa,
        shuttle_namsan,
        shuttle_fire,
        town_guseo_bufs,
        town_bufs_namsan,
        town_namsan_bufs,
        town_bufs_guseo,
        city_guseo,
        city_nopo
    })
}));

module.exports = router;