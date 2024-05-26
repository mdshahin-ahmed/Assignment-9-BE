### Assignment 8

Video link: (https://drive.google.com/file/d/14oO_CPdZ6r-L0guQDeApKqHuGfkexJQ3/view)

Live site link: (https://l2b2assignment8.vercel.app/)

Github link: (https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-mdshahin-ahmed)

Lucid chart Link: (https://lucid.app/lucidchart/9f3744c0-1c88-4dc1-9653-03d27fc9a643/edit?beaconFlowId=9E86D2ABB3740940&invitationId=inv_4ab4fa06-d751-46cc-9057-7a0d2623139e&page=0_0#)

### Credentials:

#### 1. User 1

email: **donor@example.com**

password: **123456**

#### 2. User 2

email: **requester@example.com**

password: **123456**

#### If you want to run locally first you need to clone this repository

```bash
git https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-mdshahin-ahmed
```

#### You need to install all packages

```bash
npm install
```

#### If you want to migrate you need to run this command

```bash
npm run migrate
```

#### If you want to open prisma studio you need to run this command

```bash
npm run studio
```

#### You can run this project locally with this command

```bash
npm run dev
```

#### After that you can see `My app listening on port 5000`

#### Api For Auth

1. Register user
   method: **POST**
   end points: **/api/register**

#### Api For login user

1. method: **POST**
   end points: **/api/login**

#### Api For My profile

1. Get my profile
   method: **GET**
   end points: **/api/my-profile**

2. Update my profile
   method: **PUT**
   end points: **/api/my-profile**

#### Api For Donor

1. Get all donor
   method: **GET**
   end points: **/api/donor-list**
2. For Donor request
   method: **POST**
   end points: **/api/donation-request**
3. My donation request
   method: **GET**
   end points: **/api/donation-request**
4. Update donation request status
   method: **PUT**
   end points: **/api/donation-request/:id**
