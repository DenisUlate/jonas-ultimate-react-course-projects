import { createContext, useState, useContext } from "react";
import { faker } from "@faker-js/faker";

// Crea un post aleatorio
function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

// (1) Create a Context
const PostContext = createContext();

function PostProvider({ children }) {
	// Estado local para almacenar los posts de la aplicación y la consulta de búsqueda del usuario.
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost())
	);
	// Estado local para almacenar la consulta de búsqueda del usuario.
	const [searchQuery, setSearchQuery] = useState("");

	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			  )
			: posts;

	// Event handlers
	function handleAddPost(post) {
		setPosts((posts) => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	return (
		// PROVIDE VALUE TO CHILD COMPONENTS
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				onAddPost: handleAddPost,
				onClearPosts: handleClearPosts,
				searchQuery,
				setSearchQuery,
			}}>
			{children}
		</PostContext.Provider>
	);
}

function usePosts() {
	const context = useContext(PostContext);
	if (!context) {
		throw new Error(
			"usePosts must be used within a PostProvider. Wrap a parent component in <PostProvider> to fix this error."
		);
	}
	return context;
}

export { PostProvider, usePosts };
