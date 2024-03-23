"use client"

import React from 'react';

interface SchoolInfoProps {
    studentName: string;
  }

const SchoolInfo: React.FC<SchoolInfoProps>  = ({ studentName }) => {
  console.log(studentName);
  
  return (
    <div className="school-info">
      <div className='header'>
      <div className='logo'><img src="/images/baitu.png" alt="School Logo" /></div>
      <div className='passport blue text-wrap'>{studentName}</div>
      </div>
      <h1 className='blue text-3xl font-extrabold'>BAITUL-IRFA'N MONTESSORI/HEIGHTS SCHOOL</h1>
      <h2 className='text-black font-medium text-lg'>Plot 8, Block 144, Sheik Falahi Street, Grace Land Estate,</h2>
      <h2 className='text-black font-medium text-lg'>FSSC Isheri Olofin, Lagos</h2>
      <h2 className='text-black font-medium text-lg'>08027481050, 07048802984</h2>
      <h2 className='text-red-600 border-b-2 border-t-2 border-blue-900 font-medium text-lg'>ASSESSMENT CARD</h2>
    </div>
  );
};

export default SchoolInfo;
