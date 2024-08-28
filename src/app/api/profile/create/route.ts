import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { DB } from "@/Database/database";
import { Profile } from '@/model/Profile/Profile.model';
import { User } from '@/model/User/User.model';

// Connect to the database
DB();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), 'upload');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

export const POST = async (request: NextRequest) => {
  // Process multipart form data
 try {
     const formData = await request.formData();
     
     const resume = formData.get('resume') as File | null;
     const profileImage = formData.get('profileImage') as File | null;
     const username = formData.get('username') as string;
     const bio = formData.get('bio') as string;
     const email = formData.get('email') as string;
   
     // Parse JSON fields
     const experience = JSON.parse(formData.get('experience') as string);
     const education = JSON.parse(formData.get('education') as string);
     const projects = JSON.parse(formData.get('projects') as string);
   
     let resumePath = '';
     let profileImagePath = '';
   
     const uploadDir = path.join(process.cwd(), 'upload');
     if (!fs.existsSync(uploadDir)) {
       fs.mkdirSync(uploadDir, { recursive: true });
     }
   
     if (resume) {
       const resumeFilename = `${uuidv4()}_${resume.name}`;
       resumePath = path.join(uploadDir, resumeFilename);
       const resumeBuffer = await resume.arrayBuffer();
       fs.writeFileSync(resumePath, Buffer.from(resumeBuffer));
     }
   
     if (profileImage) {
       const profileImageFilename = `${uuidv4()}_${profileImage.name}`;
       profileImagePath = path.join(uploadDir, profileImageFilename);
       const profileImageBuffer = await profileImage.arrayBuffer();
       fs.writeFileSync(profileImagePath, Buffer.from(profileImageBuffer));
     }
   
     const user = await User.findOne({ email: email });
     if (!user) {
       return NextResponse.json({ message: "User not found" }, { status: 404 });
     }
   
     const profileUser = new Profile({
       userInfo: user._id,
       Username: username,
       resume: resumePath,
       experience: experience,
       projects: projects,
       bio: bio,
       profileImage: profileImagePath,
       education: education,
     });
   
     await profileUser.save();
     return NextResponse.json({ message: "Done" }, { status: 201 });
 } catch (error) {
    return NextResponse.json({"message":error},{status:500})
    
 }
};
