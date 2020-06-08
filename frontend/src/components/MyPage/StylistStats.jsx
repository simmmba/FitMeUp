import React, {useEffect, useState} from 'react'
import "./MyPageMain.scss";
import {Chart} from "react-google-charts";
import axios from 'axios'

const StylistStats = () => {
    const loginUser = JSON.parse(window.sessionStorage.getItem("user"))
    const [creditInfo, setCreditInfo] = useState([])
    const [isCreditExist, setIsCreditExist] = useState(false)
    const [consultInfo, setConsultInfo] = useState()
    const [isConsultExist, setIsConsultExist] = useState(false)
    const [scoreInfo, setScoreInfo] = useState({score_1: 0, score_2: 0, score_3: 0, score_4: 0, score_5: 0})
    const [isScoreExist, setIsScoreExist] = useState(false)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/statistics/score?stylist_id=` + loginUser.id)
            .then(res => {
                setScoreInfo(res.data.info)
                res.data.info.score_5 = 4;
                res.data.info.score_4 = 2;
                res.data.info.score_3 = 1;
                if(res.data.info.score_1 > 0) setIsScoreExist(true);
                if(res.data.info.score_2 > 0) setIsScoreExist(true);
                if(res.data.info.score_3 > 0) setIsScoreExist(true);
                if(res.data.info.score_4 > 0) setIsScoreExist(true);
                if(res.data.info.score_5 > 0) setIsScoreExist(true);
            }).catch(err => {
                console.log(err)
                alert("평점 통계 자료 조회 중 오류가 발생했습니다.")
        })

        axios.get(`${process.env.REACT_APP_URL}/statistics/consult?stylist_id=` + loginUser.id)
            .then(res => {
                console.log(res.data)
                if(res.data.info.length === 0) {
                    setIsConsultExist(false)
                } else {

                }
            }).catch(err => {
                console.log(err)
                alert("컨설팅 통계 자료 조회 중 오류가 발생했습니다.")
        })

        axios.get(`${process.env.REACT_APP_URL}/statistics/payment?stylist_id=` + loginUser.id)
            .then(res => {
                if(res.data.info.length === 0) {
                    setIsCreditExist(false)
                } else {
                    // console.log(res.data.info)
                    // setIsCreditExist(true)
                    const credits = [["월", "수익", "출금"]]
                    // res.data.info.push({
                    //     month:"5", income: 50000, witdraw: 100000
                    // })
                    res.data.info.forEach(c => {
                        credits.push([c.month + "월", parseInt(c.income), parseInt(c.witdraw)])
                    })
                    setCreditInfo(credits)
                }
            })
    }, [])
    return (
        <div className="middle_tab">
            <div className="center">
                <h3>
                    <b>통계 정보</b>
                </h3>
            </div>
            <div className="center half">
                <div className="col-6">
                    {setIsCreditExist?(
                        <Chart
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            data={creditInfo}
                            options={{
                                title: "수익",
                                hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
                                vAxis: { minValue: 0 },
                                chartArea: { width: "60%", height: "70%" },
                            }}
                        />
                    ):(<div>수익 내역이 없습니다.</div>)}
                </div>
                <div className="col-6">
                    {isScoreExist?(
                        <Chart
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['평점', '평점 비율'],
                                ['1점', scoreInfo.score_1],
                                ['2점', scoreInfo.score_2],
                                ['3점', scoreInfo.score_3],
                                ['4점', scoreInfo.score_4],
                                ['5점', scoreInfo.score_5],
                            ]}
                            options={{
                                title: '평점',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    ):(
                        <div>평점 내역이 없습니다.</div>
                    )}
                </div>
            </div>
            <div className="center half">
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            'Month',
                            'Bolivia',
                            'Ecuador',
                            'Madagascar',
                            'Papua New Guinea',
                            'Rwanda',
                            'Average',
                        ],
                        ['2004/05', 165, 938, 522, 998, 450, 614.6],
                        ['2005/06', 135, 1120, 599, 1268, 288, 682],
                        ['2006/07', 157, 1167, 587, 807, 397, 623],
                        ['2007/08', 139, 1110, 615, 968, 215, 609.4],
                        ['2008/09', 136, 691, 629, 1026, 366, 569.6],
                    ]}
                    options={{
                        title: 'Monthly Coffee Production by Country',
                        vAxis: { title: 'Cups' },
                        hAxis: { title: 'Month' },
                        seriesType: 'bars',
                        series: { 5: { type: 'line' } },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        </div>
    )
}

export default StylistStats