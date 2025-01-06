import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {

const loggedIn = {firstName: 'Jonas', lastName: "Kwan", email: "contact@jsmastery.com"};
  return (
   <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                    type = "greeting"
                    title='Welcome'
                    user = {loggedIn?.firstName || 'Guest'}
                    subtext = "Access and Manage your account and transactions efficiently."
                />
                <TotalBalanceBox
                    accounts = {[]}
                    totalBanks = {1}
                    totalCurrentBalance = {1250.35}
                />
            </header>

            RECENT TRANSAXTIONS
        </div>
        <RightSideBar
        user = {loggedIn}
        transactions = {[]}
        banks = {[{ currentBalance: 123.50}, {currentBalance : 500.50}]}
        />
   </section>
  )
}

export default Home
