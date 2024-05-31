import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ar';
import { useState, useEffect } from "react";
import { useForkRef } from "@mui/material";
import Header from '../../components/Header'
import  Footer from '../../components/Footer'
import "moment/dist/locale/ar-dz";
moment.locale("ar");
export default function MainContent() {
	// STATES
	const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
	const [timings, setTimings] = useState({
		Fajr: "04:20",
		Dhuhr: "11:50",
		Asr: "15:18",
		Sunset: "18:03",
		Isha: "19:33",
	});

	const [remainingTime, setRemainingTime] = useState("");

	const [selectedCity, setSelectedCity] = useState({
		displayName: "الموصل",
		apiName: "mosul",
	});

	const [today, setToday] = useState("");

	

	const prayersArray = [
		{ key: "Fajr", displayName: "الفجر" },
		{ key: "Dhuhr", displayName: "الظهر" },
		{ key: "Asr", displayName: "العصر" },
		{ key: "Sunset", displayName: "المغرب" },
		{ key: "Isha", displayName: "العشاء" },
	];
	const getTimings = async () => {
		console.log("calling the api");
		const response = await axios.get(
			`https://api.aladhan.com/v1/timingsByCity?country=iraq&city=${selectedCity.apiName}`
		);
		setTimings(response.data.data.timings);
	};
	useEffect(() => {
		getTimings();
	}, [selectedCity]);

	useEffect(() => {
		let interval = setInterval(() => {
			console.log("calling timer");
			setupCountdownTimer();
		}, 1000);

		const t = moment();
moment.locale('ar'); // Set locale to Arabic
setToday(t.format("MMM Do| YYYY | h:mm"));

		return () => {
			clearInterval(interval);
		};
	}, [timings]);



	const setupCountdownTimer = () => {
		const momentNow = moment();

		let prayerIndex = 2;

		if (
			momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
		) {
			prayerIndex = 1;
		} else if (
			momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
		) {
			prayerIndex = 2;
		} else if (
			momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
		) {
			prayerIndex = 3;
		} else if (
			momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
			momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
		) {
			prayerIndex = 4;
		} else {
			prayerIndex = 0;
		}

		setNextPrayerIndex(prayerIndex);

		// now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
		const nextPrayerObject = prayersArray[prayerIndex];
		const nextPrayerTime = timings[nextPrayerObject.key];
		const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

		let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

		if (remainingTime < 0) {
			const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
			const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
				moment("00:00:00", "hh:mm:ss")
			);

			const totalDiffernce = midnightDiff + fajrToMidnightDiff;

			remainingTime = totalDiffernce;
		}
		console.log(remainingTime);

		const durationRemainingTime = moment.duration(remainingTime);

		setRemainingTime(
			`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
		);
		console.log(
			"duration issss ",
			durationRemainingTime.hours(),
			durationRemainingTime.minutes(),
			durationRemainingTime.seconds()
		);
	};
;

	return (
	<>
	<Header />
			<h1 className="text-[30px] text-center font-sans pb-10 pt-10 font-bold">مواقيت الصلاة لمدينة الموصل </h1>

	<div className=" w-[100%] h-max pb-14">
    <div className="flex flex-row">
        <div className="flex-auto">
            <h2 className="text-[22px] pr-4">{today}</h2>
            <h1 className="font-sans text-xl pt-4 pb-4 pr-4">{selectedCity.displayName}</h1>
        </div>
        <div className="flex-auto ">
            <h2 className="font-sans text-[24px] text-center  ">متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1 className="text-center text-[20px]">{remainingTime}</h1>
        </div>
    </div>
    {/*== TOP ROW ==*/}
    <hr className="border-white opacity-10" />
    
    {/* PRAYERS CARDS */}
    <div className="grid grid-cols-1 pr-9 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5   space-y-4">
        <Prayer 
            name="الفجر"
            time={timings.Fajr}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhTjWpMAsJyxw3qOm1NapnSZeRs6uMBjO9TfWBM6wr3Q&s"
        />
        <Prayer
            name="الظهر"
            time={timings.Dhuhr}
            image="https://media.istockphoto.com/photos/little-boy-praying-alongside-his-father-during-ramadan-picture-id958638434?k=20&m=958638434&s=612x612&w=0&h=jMNZqoxoymIecmAeq-lwJcn-FSW3dkuOGxhIBVp9_34="
        />
        <Prayer
            name="العصر"
            time={timings.Asr}
            image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
        />
        <Prayer
            name="المغرب"
            time={timings.Sunset}
            image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
        />
        <Prayer
            name="العشاء"
            time={timings.Isha}
            image="https://trend.nl7za.com/wp-content/uploads/2023/10/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%B5%D9%84%D8%A7%D8%A9-%D8%A7%D9%84%D8%B9%D8%B4%D8%A7%D8%A1-.jpg"
        />
    </div>

		
	</div>
	<Footer/>
</>

	);
}