"use client"

interface SubjectRowProps {
    subjectObj: {
      subject: string;
      grade: string;
      ca1: any;
      ca2: any;
      exam: any;
      total?: any;
    };
    setSubjects: React.Dispatch<React.SetStateAction<any[]>>;
    subjects: any
  }
  
  
  const SubjectRow: React.FC<SubjectRowProps> = ({ subjects, setSubjects, subjectObj }) => {
    const calculateTotal = () => {
      const ca1 = parseFloat(subjectObj.ca1) || 0;
      const ca2 = parseFloat(subjectObj.ca2) || 0;
      const exam = parseFloat(subjectObj.exam) || 0;
      return ca1 + ca2 + exam;
    };
  

    // const displayGrade = (total: any) => {
    //   switch (total) {
    //     case total >= 70:
    //       return 'A';
    //     case total >= 60:
    //       return 'B';
    //     case total >= 50:
    //       return 'C';
    //     case total >= 40:
    //       return 'D';
    //     case total >= 30:
    //       return 'E';
    //     default:
    //       return 'F';
    //   }
    // }
    const displayGrade = (total: number) => {
      
      if (total >= 70) {
        return 'A';
      } else if (total >= 60) {
        return 'B';
      } else if (total >= 50) {
        return 'C';
      } else if (total >= 40) {
        return 'D';
      } else if (total >= 30) {
        return 'E';
      } else {
        return 'F';
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
      const { value } = e.target;
    
      const updatedSubject = {
        ...subjectObj, // Spread the current subject object
        [fieldName]: value // Update the field with the parsed value
      };
    
      // Calculate the new total
      const newTotal = Number(updatedSubject.ca1 || 0) + Number(updatedSubject.ca2 || 0) + Number(updatedSubject.exam || 0);
      updatedSubject.total = newTotal;
    
      // Calculate the new grade based on the total
      updatedSubject.grade = displayGrade(newTotal);
      
    
      // Update the subjects array with the updated subject
      const updatedSubjects = subjects.map((subj: any) =>
        subj.subject === subjectObj.subject ? updatedSubject : subj
      );
    
      // Update the state with the new subjects array
      setSubjects(updatedSubjects);
    };
    
    
    return (
      <tr className="text-black border-collapse border-black">
      <td className="border border-black ">
        <input className="input" type="text" value={subjectObj.subject} onChange={(e) => handleChange(e, 'subject')} />
      </td>
      <td className="border border-black">
        <input className="input" type="text" value={subjectObj.ca1 || ''} onChange={(e) => handleChange(e, 'ca1')} />
      </td>
      <td className="border border-black">
        <input className="input" type="text" value={subjectObj.ca2 || ''} onChange={(e) => handleChange(e, 'ca2')} />
      </td>
      <td className="border border-black">
        <input className="input" type="text" value={subjectObj.exam || ''} onChange={(e) => handleChange(e, 'exam')} />
      </td>
        <td className="border border-black p-2">{subjectObj.total}</td>
        <td className="border border-black p-2">{subjectObj.grade}</td>
      </tr>
    );
  };
  
  export default SubjectRow;
  