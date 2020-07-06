import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function SideBarMyInfo() {
  const me = {
    github: "https://github.com/glenpark00",
    linkedin: "https://www.linkedin.com/in/glen-park/",
  }

  return (
    <div className='my-info'>
      <div className="my-info-pic">
        <div className="my-info-content">
          <div>
            <div>Created by:</div>
            <div>Glen Park</div>
          </div>
          <div className="my-info-icons">
            <a href={me.github} target="_blank">
              <FaGithub className="my-info-git-logo" />
            </a>
            <a href={me.linkedin} target="_blank">
              <FaLinkedin className="my-info-li-logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}