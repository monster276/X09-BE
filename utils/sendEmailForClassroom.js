const nodemailer = require("nodemailer");

const sendEmailForClassroom = async (student, classroom) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nodemailtest0451@gmail.com",
      pass: "obecdbodoifhctvo",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"nodemailtest0451@gmail.com', // sender address
    to: student, // list of receivers
    subject: `THÔNG BÁO KHAI GIẢNG LỚP ${
      classroom.name
    } (${classroom.startTime.toLocaleDateString()})`, // Subject line
    text: "Hello world?", // plain text body
    html: `<div>
            <img src="https://thumbs.gfycat.com/AgedMiniatureBoto-max-1mb.gif"/>
            <h2>THÔNG BÁO KHAI GIẢNG LỚP ${
              classroom.name
            } (${classroom.startTime.toLocaleDateString("en-GB")})</h2>
            <h3>1. Lịch học</h3>
            <p>Lớp chúng ta sẽ học ${classroom.schedule.length} buổi vào tối ${
      classroom.schedule
    }</p>
            <p><b>Thời gian khai giảng:</b> ${classroom.startTime.toLocaleDateString(
              "en-GB"
            )}</p>
            <div><b>Mã lớp học:</b> ${classroom.name}</div>
            <h3>2. Tham gia vào nhóm lớp</h3>
            <p>Nhóm lớp là không gian chung để trao đổi giữa học viên với giảng viên, mentor và chuyên viên vận hành lớp học, bao gồm các thông tin quan trọng về hoạt động, các thay đổi và cập nhập quan trọng trong học kỳ. Đồng thời là nơi giao lưu và trao đổi kiến thức giữa các học viên của lớp.</p>
            <h3>3. Nội quy lớp học </h3>
            <p>Nội quy lớp học tại MindX được thiết kế để đảm bảo lớp học diễn ra một cách trật tự, hiệu quả và đáp ứng với nhu cầu học tập của từng cá nhân. <a href="https://docs.google.com/document/d/155vpcSi-LiPdcbCuIBWOyL1UnlvvSakP-zljoZNSOhQ/edit">Bạn vui lòng đọc kỹ Nội quy lớp học nha</a>.</p>  
            <p>--</p>
            <p>Bạn thân mến, hành trình trở thành Lập Trình Viên đang chờ đón bạn với nhiều thử thách nhưng cũng hứa hẹn nhiều cơ hội trước mắt. MindX rất hân hạnh được đồng hành cùng bạn, và luôn luôn sẵn sàng cải tiến chất lượng giảng dạy/dịch vụ để mang đến cho bạn một trải nghiệm học tập tốt nhất. </p>
            <p>Nếu cần hỗ trợ, đừng ngần ngại nhắn tin Zalo hoặc gọi cho mình theo số điện thoại 0359928347 . Hẹn gặp bạn ở lớp học nhé!</p>
          </div>  
          `, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmailForClassroom;
