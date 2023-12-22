//Header
const search = document.querySelector(".search-box-btn");
// Main-content
const userMainContent = document.querySelector(".main-content");
const userImg = document.querySelector(".user-img");
const userName = document.querySelector(".username");
const userGitRef = document.querySelector(".user-about a");
const userBio = document.querySelector(".user-bio");
const createdAt = document.querySelector(".date-joined");
//User-stats
const reposCount = document.getElementById("repos");
const followersCount = document.getElementById("followers");
const followingCount = document.getElementById("following");
//User-followers
const userLocation = document.querySelector(".location");
const userTwitter = document.querySelector(".twitter");
const userWebsite = document.querySelector(".website");
const userCompany = document.querySelector(".company");

const handleButtonClick = async (event) => {
  const user = document.querySelector(".search-box-items input").value.trim();
  if (!user) {
    return;
  }
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();

    updUserContent(data);
  } catch (error) {
    console.log("Error occurred. Hiding main content.");
    return;

    // Попробуем добавить класс напрямую
    userMainContent.classList.add("hide-main-content");
  }
};

function updUserContent(data) {
  const {
    avatar_url,
    html_url,
    created_at,
    login,
    name,
    bio,
    followers,
    following,
    public_repos,
    location,
    blog,
    company,
    twitter_username,
  } = data;
  userImg.src = avatar_url;
  userGitRef.href = html_url;
  userGitRef.innerText = `@${login}`;
  userName.innerText = name || login;

  const dateOptions = { day: "numeric", month: "short", year: "numeric" };
  const dateString = created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const joinedDate = formattedDate.split(",");
  const dayAndMonth = joinedDate[0].split(" ");
  createdAt.innerText = `Joined ${dayAndMonth[1]} ${dayAndMonth[0]} ${joinedDate[1]} `;

  if (bio) {
    userBio.innerText = `${bio}`;
  } else {
    userBio.innerText = `This profile has no bio`;
    userBio.style.color = "hsl(217, 20%, 51%)";
  }

  reposCount.innerText = public_repos;
  followingCount.innerText = following;
  followersCount.innerText = followers;

  if (location) {
    userLocation.innerText = location;
  } else {
    userLocation.innerText = `Not Available`;
    userLocation.style.color = "hsl(217, 20%, 51%)";
  }
  if (blog) {
    userWebsite.innerText = blog;
  } else {
    userWebsite.innerText = `Not Available`;
    userWebsite.style.color = "hsl(217, 20%, 51%)";
  }
  if (company) {
    userCompany.innerText = company;
  } else {
    userCompany.innerText = `Not Available`;
    userCompany.style.color = "hsl(217, 20%, 51%)";
  }
  if (twitter_username) {
    userTwitter.innerText = twitter_username;
  } else {
    userTwitter.innerText = `Not Available`;
    userTwitter.style.color = "hsl(217, 20%, 51%)";
  }
}

search.addEventListener("click", handleButtonClick);
