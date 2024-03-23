"use client"

import React, { useState } from 'react';
import Modal from '../lib/Modal';
import SchoolInfo from './SchoolInfo';
import StudentInfo from './StudentInfo';
import SubjectRow from './SubjectRow';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Subject {
  subject: string;
  grade: string;
  ca1: string;
  ca2: string;
  exam: string;
  total?: any; // Optional
}

interface ReportCardState {
  subjects: Subject[];
}
interface SchoolInfoProps {
    schoolName: string;
    schoolImage: string;
  }

  interface StudentInfoProps {
    name: string;
    studentClass: string;
    noInClass: string;
    sex: string;
    term: string;
    year: string;
  }

const ReportCard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentInfo, setStudentInfo] = useState<any>({})
  const [currentSchoolInfo, setCurrentSchoolInfo] = useState<any>({ name: '', image: '' });
  const [affective, setAffective] = useState({});
  const [loading, setLoading] = useState(false);



  const addSubject = () => {
    setSubjects([...subjects, { subject: '',  ca1: '', ca2: '', exam: '', grade: '', total: ''}]);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value } = e.target;
    setAffective({...affective, [fieldName]: value});
  };

  const generatePDF = () => {
    setLoading(true);
    const container: any = document.querySelector('.container');

    html2canvas((container)).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png', 0.7);

      const pdfWidth = 210; 
      let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const maxHeight = 297; 
      if (pdfHeight > maxHeight) {
          pdfHeight = maxHeight;
      }

      const pdf = new jsPDF('p', 'mm', 'a4', true);

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${studentInfo?.name}report.pdf`);
      setLoading(false);
    });
  };

  const totalSum = subjects.reduce((acc, curr) => acc + curr.total, 0);
  const arrayLength = (subjects.length) * 100;
  const percent = (totalSum / arrayLength) * 100;
  
  
  
  return (
    <div>
      <div className='container bg-white text-black max-w-600'>
      <SchoolInfo
          studentName={studentInfo?.name}
      />
        {/* {currentSchoolInfo?.name ? (
        <>
            <SchoolInfo
                schoolImage={currentSchoolInfo?.image}
                schoolName={currentSchoolInfo?.name}
            />
            <button onClick={handleEditSchoolInfo}>Edit School Info</button>
        </>
        ) : 
        (<button onClick={openSchoolInfoModal}>Add School Info</button>)} */}

    {/* <Modal
        isOpen={isSchoolInfoModalOpen}
        onClose={closeSchoolInfoModal}
        title={isEditMode ? 'Edit School Info' : 'Add School Info'}
      >
        <form onSubmit={handleSaveSchoolInfo}>
          <label className='text-black'>
            School Name:
            <input className='border border-gray-600 px-2 py-1 mt-1 w-full' type="text" value={currentSchoolInfo.name} onChange={e => setCurrentSchoolInfo({ ...currentSchoolInfo, name: e.target.value })} />
          </label>
          <label className='text-black'>
            School Image URL:
            <input
              className='border border-gray-600 px-2 py-1 mt-1 w-full'
              type="file" // Change input type to file
              accept="image/*" // Accept only image files
              onChange={e => setCurrentSchoolInfo({ ...currentSchoolInfo, image: e.target.files ? e.target.files[0] : null })}
            />
          </label>
          <button className='text-black' type="submit">Save</button>
        </form>
      </Modal> */}
      
      <StudentInfo
        setInfoState={setStudentInfo}
        info={studentInfo}
      />
      <h1 className='blue text-4xl containerbg font-extrabold'>BAITUL-IRFA&apos;N MONTESSORI/HEIGHTS SCHOOL</h1>

      <div className='reportCOntainer'>
      <div className='grade'>
      <table className="report-card border-collapse border-black w-full mt-2">
        <thead>
          <tr>
            <th className="text-red-600 border border-black p-2 w-2/5">Subject</th>
            <th className="border border-black p-2">CA 1</th>
            <th className="border border-black p-2">CA 2</th>
            <th className="border border-black p-2">Exam</th>
            <th className="border border-black p-2">Total</th>
            <th className="border border-black p-2">Grade</th>
            
          </tr>
        </thead>
        <tbody className="report-card border-collapse border-black">
          {subjects.map((subject, index) => (
            <SubjectRow
              key={index}
              subjectObj={subject}
              subjects={subjects}
              setSubjects={setSubjects}
            />
          ))}
          <tr className="text-black border-collapse border-black">
            <td className="" />

            <td className="" />
            <td className=""/>
            <td className=""/>
            <td className="border border-black text-red-600 font-bold total">Total Score</td>
            <td className="border border-black">{totalSum}</td>
          </tr>
          <tr className="text-black border-collapse border-black">
            <td className="" />

            <td className="" />
            <td className=""/>
            <td className=""/>
            <td className="border border-black text-red-600 font-bold total">%</td>
            <td className="border border-black">{Math.round(percent || 0)}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className='sideGrid'>
        <div className='affective mt-1'>
          <div className='text-center font-medium'>AFFECTIVE DOMAIN</div>
          <table className="report-card border-collapse border-black w-full">
            <thead>
              <tr>
                <th className=" text-red-600 border border-black p-2 w-4/6">BEHAVIOUR</th>
                <th className=" text-red-600 border border-black p-2">RATING</th>
                
              </tr>
            </thead>
            <tbody className="border-collapse border-black w-full mt-4">
            <tr className="text-black border-collapse border-black">
              <td className="border border-black p-2 text-sm">PUNCTUALITY</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'punc')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="border border-black p-1 text-sm">NEATNESS</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'neat')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="border border-black p-1 text-sm">POLITENESS</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'polite')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="border border-black p-1 text-sm">HONESTY</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'honesty')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="border border-black p-1 text-sm">SELF CONTROL</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'self')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="border border-black p-1 text-sm">WILLINGNESS TO LEARN</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'will')} />
              </td>
            </tr>
            </tbody>
          </table>    
        </div>

        <div className='border border-black mt-2 text-center'>
          <div className='text-sm text-red-600'>KEY TO RATING OF TRAITS</div>
          <div className='mt-1 blue'>5 - Excellent</div>
          <div className='blue'>4 - Very good</div>
          <div className='blue'>3 -good</div>
          <div className='blue'>2 - Fair</div>
          <div className='blue'>1 - Low</div>
        </div>

        <div className='border border-black mt-2 text-center'>
          <div className='text-sm text-red-600'>KEY TO GRADING</div>
          <div className='mt-1 blue'>70-100-A</div>
          <div className='blue'>60-69-B</div>
          <div className='blue'>50-59-C</div>
          <div className='blue'>40-49-D</div>
          <div className='blue'>30-39-E</div>
          <div className='blue'>0-29-F</div>
        </div>

      </div>
      </div>
      <div>
        <table className="report-card border-collapse border-black w-full">
            <thead>
              <tr>
                <th className=" text-red-600 border border-black  p-0 w-1/3"/>
                <th className=" text-red-600 border border-black p-0"/>
                
              </tr>
            </thead>
            <tbody className="border-collapse border-black w-full">
            <tr className="text-black border-collapse border-black">
              <td className="border blue border-black">FROM MASTER REMARK</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'remark')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="blue border border-black">POSITION</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'position')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="blue border border-black">SIGNATURE</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'signature')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="blue border border-black">THIS TERM ENDS</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'end')} />
              </td>
            </tr>
            <tr className="text-black border-collapse border-black">
              <td className="blue border border-black">NEXT TERM BEGINGS</td>
              <td className="border border-black">
                <input className="input" type="text" onChange={(e) => handleChange(e, 'next')} />
              </td>
            </tr>
            </tbody>
          </table>    
        </div>
    </div>
    <div className='btnContainer'> 
      <button className='btn' onClick={addSubject}>Add Subject</button>
      <button className='btn' onClick={generatePDF}>{loading ? 'Loading...' : 'Generate PDF' }</button>
      </div>
    </div>
  );
};

export default ReportCard;
