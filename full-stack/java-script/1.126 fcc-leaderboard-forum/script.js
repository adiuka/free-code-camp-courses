const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};

const timeAgo = (time) => {
	const past = new Date(time);
	const now = new Date();
	const diffMs = now - past;

	const minutes = Math.floor(diffMs / (1000 * 60));
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (minutes < 60) {
		return `${minutes}m ago`;
	}

	if (hours < 24) {
		return `${hours}h ago`;
	}

	return `${days}d ago`;
}

const viewCount = (views) => {
  if (views >= 1000) {
    return `${Math.floor(views / 1000)}k`;
  }
  return views;
};

const forumCategory = (id) => {
	let category;
	let className;

	if (Object.hasOwn(allCategories, id)) {
		category = allCategories[id]['category'];
		className = allCategories[id]['className'];
	} else {
		category = "General";
		className = "general";
	}

	return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${category}</a>`;
}

const avatars = (posters, users) => {
	return posters.map((poster) => {
		const user = users.find((u) => u.id === poster.user_id);
		let src = user.avatar_template.replace("{size}", 30);

		if (src.startsWith("/")) {
			src = `${avatarUrl}${src}`;
		}

		return `<img src="${src}" alt="${user.name}">`;
	}).join("");
}

const showLatestPosts = (data) => {
	const postContainer = document.getElementById("posts-container");
	const { users, topic_list } = data;
	const { topics } = topic_list;

	postContainer.innerHTML = topics.map((topic) => {
		const { id, title, views, posts_count, slug, posters, category_id, bumped_at } = topic;

		return `
			<tr>
				<td>
					<a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>
					${forumCategory(category_id)}
				</td>
				<td>
					<div class="avatar-container">${avatars(posters, users)}</div>
				</td>
				<td>
					${posts_count - 1}
				</td>
				<td>
					${viewCount(views)}
				</td>
				<td>
					${timeAgo(bumped_at)}
				</td>
			</tr>
		`;
	}).join("");
};

const fetchData = async () => {
	try {
		const res = await fetch(forumLatest);
		const data = await res.json();
		showLatestPosts(data);
	} catch (err) {
		console.log(err);
	}
}

fetchData();