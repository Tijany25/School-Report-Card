import React from 'react';

interface StudentInfoProps {
  info: {
    name: string;
    studentClass: string;
    noInClass: string;
    sex: string;
    term: string;
    year: string;
  };
  setInfoState: React.Dispatch<React.SetStateAction<any>>;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ info, setInfoState }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoState((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="student-info mt-2 px-5">
      <div className='flex text-lg'>
        <div className='flex flex-1 w-64'>Name: <span className='redBorder'> <input type="text " name="name" value={info.name} onChange={handleChange} placeholder="Name" /></span></div>
        <div className='flex flex-1 w-32'>Class: <span className='redBorder'><input type="text" name="studentClass" value={info.studentClass} onChange={handleChange} placeholder="Class" /></span> </div>
      </div>
      <div className='text-l py-2 studentInfo'>
        <div className='text-nowrap noinclass flex'>Number in class: <span className='redBorder'><input type="text" name="noInClass" value={info.noInClass} onChange={handleChange} placeholder="No in class" /></span> </div>
        <div className='flex'>Sex:  <span className='redBorder'><input type="text" className='w-20' name="sex" value={info.sex} onChange={handleChange} placeholder="Sex" /></span> </div>
        <div className='flex'>Term:  <span className='redBorder'><input type="text" name="term" value={info.term} onChange={handleChange} placeholder="Term" /></span> </div>
        <div className='flex'>Year:  <span className='redBorder'><input type="text" className='w-20' name="year" value={info.year} onChange={handleChange} placeholder="Year" /></span> </div>
      </div>
    </div>
  );
};

export default StudentInfo;
