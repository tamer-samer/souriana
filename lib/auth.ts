// import { auth, currentUser } from "@clerk/nextjs/server";

// export const isAdmin = async () => {
//   const user = await currentUser();
//   const role = user?.publicMetadata.role;

//   return role === "admin";
// };

// export const isUser = async () => {
//   const user = await currentUser();
//   const role = user?.publicMetadata.role;

//   return role !== "admin" && role !== "partner";
// };

// export const requireAuth = async () => {
//   const user = await auth();
//   const userId = user.userId;
//   if (!userId) {
//     throw new Error("Unauthorized 403");
//   }
//   const isUserVal = await isUser();
//   if (isUserVal) {
//     throw new Error("You are not an admin or partner 403");
//   }
// };

// export const requireAdmin = async () => {
//   const isAdminVal = await isAdmin();
//   if (!isAdminVal) {
//     throw new Error("You are not an admin 403");
//   }
// };
