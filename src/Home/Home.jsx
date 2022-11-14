import React from "react";
import { Link, Route, Routes } from 'react-router-dom'
import { AboutUs } from '../AboutUs/AboutUs'
import { Contact } from '../Contact/Contact'
import { LogIn } from '../LogIn/LogIn'
import { NewOrder } from '../NewOrder/NewOrder'
import { Prices } from '../Prices/Prices'
import { Tracking } from '../Tracking/Tracking'
import { Navbar } from '../SharedComponents/Navbar'
import { Footer } from '../SharedComponents/Footer'

export function Home() {
    return (
        <div>
            <Navbar/>
            <Footer/>
        </div>
    );
}