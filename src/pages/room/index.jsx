import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
  const { roomId } = useParams();
  const myMeeting = (element) => {
    const appID = 286130343;
    const serverSecret = "2b83476ae0a2f17a2158e4b4f08c11c4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "irfan"
    );

    //store this url in the appointment collection and use it when use click the active session

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      // sharedLinks: [
      //   {
      //       name:"Copy Link",
      //       url:`localhost:3000/room/${roomId}`
      //   }
      // ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
       },
       showScreenSharingButton:false,
    })
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default RoomPage;
