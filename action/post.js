"use server";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  "use server";
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  const error = [];
  if (!title || title.trims().length === 0) {
    error.push("Title is required.");
  }
  if (!image || image.size === 0) {
    error.push("Image is required.");
  }
  if (!content || content.trims().length === 0) {
    error.push("Content is required.");
  }

  console.log(prevState);

  if (error.length > 0) {
    return { error };
  }

  await storePost({
    imageUrl: "",
    title,
    content,
    userId: 1,
  });

  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", 'layout');
}
