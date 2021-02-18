function Teacher({info}) {
    
      const monhoc = info.subject.map((value, indx) => (
        <li key = {indx}>{value.code} - {value.name}</li>
      ));
      return (
        <div>
          {/* {element} */}
          <ul>
            <li>name : {info.name}</li>
            <li>ngày sinh: {info.birthday}</li>
            <li>địa chỉ: {info.address}</li>
            <li>tình trạng hôn nhân: {(info.married)== false ? "chưa kết hôn" : "đã kết hôn"}</li>
            <li>Môn học : 
              <ul>
              {monhoc}
              </ul>
            </li>
          </ul>
        </div>
      );
}
export default Teacher;