React Project: Crowdfunding App (Part 2)https://crowdfunding2getr.netlify.app/

 Have user accounts. A user should have at least the following attributes:
 Username
 Email address
 Password
 https://crowdfunding2getr.netlify.app/signup

![](2026-02-22-21-06-59.png)


 Ability to create a “fundraiser” to be crowdfunded which will include at least the following attributes:
 Title
 Owner (a user)
 Description
 Image
 Target amount to raise
 src/components/FundraiserForm.jsx
https://crowdfunding2getr.netlify.app/fundraisers/create
![](2026-02-22-21-14-42.png)
![](2026-02-22-21-21-32.png)
![](2026-02-22-21-22-53.png)

 Whether it is currently open to accepting new supporters or not/ When the fundraiser was created
 ![](2026-02-22-21-25-40.png)
 https://crowdfunding2getr.netlify.app/fundraisers/45


 Ability to “pledge” to a fundraiser. A pledge should include at least the following attributes:
 An amount
 The fundraiser the pledge is for
 The supporter/user (i.e. who created the pledge)
 Whether the pledge is anonymous or not
 A comment to go along with the pledge

https://crowdfunding2getr.netlify.app/pledges/new?fundraiser=45
![](2026-02-22-21-27-27.png)
![](2026-02-22-21-28-05.png)

 Implement suitable update/delete functionality, e.g. should a fundraiser owner be allowed to update its description?
 Implement suitable permissions, e.g. who is allowed to delete a pledge?
 src/components/FundraiserPage.jsx
![alt text](image-3.png)
Only open fundraisers allow new pledges

![](2026-02-22-21-39-35.png)
Owners can update their fundraiser
Superusers can update any fundraisers
Only super user can delete fundraisers

![](2026-02-22-21-41-43.png)
Only supporter can edit their pledge
Supporter or super user can delete their pledge  (super user all pledges) 


A screenshot of the resulting page when an unauthorized user attempts to edit a fundraiser (optional, depending on whether or not this functionality makes sense in your app!)
![](2026-02-22-21-52-40.png)

User can only view the page, add some pledges but cannot edit
https://crowdfunding2getr.netlify.app/fundraisers/45