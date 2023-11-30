import { request, gql } from 'graphql-request';

export function getFooterMenu() {
	const query = gql`
		query socialMenu {
			menu(id: "social-menu", idType: LOCATION) {
				menuItems {
					socials: nodes {
						connectedNode {
							social: node {
								... on Social {
									id
									title
									socialMeta {
										socialLinkType
										primaryColor
										textColor
										url
										document {
											mediaItemUrl
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`;

	return request({
		url: import.meta.env.WORDPRESS_API_URL,
		document: query,
	});
}

export function getHeaderMenu() {
	const query = gql`
		query mainMenu {
			menu(id: "main-menu", idType: LOCATION) {
				menuItems {
					nodes {
						title
						url
						label
					}
				}
			}
		}
	`;

	return request({
		url: import.meta.env.WORDPRESS_API_URL,
		document: query,
	});
}

export function getHomePage() {
	const query = gql`
		query homePage {
			page(id: "/", idType: URI) {
				title
				content
				featuredImage {
					node {
						altText
						sourceUrl
					}
				}
			}
		}
	`;

	return request({
		url: import.meta.env.WORDPRESS_API_URL,
		document: query,
	});
}

export function getBlogArchive() {
	const query = gql`
	query blogArchiveQuery {
    posts(first: 100) {
      allPosts: nodes {
        ${archivePostFragment}
      }
    }
  }`;

	return request({
		url: import.meta.env.WORDPRESS_API_URL,
		document: query,
	});
}

const tagLinkFragment = gql`
	id
	name
	uri
`;

const archivePostFragment = gql`
	title
	excerpt
	uri
	dateGmt
	author {
		node {
			name
		}
	}
	tags {
		nodes {
			${tagLinkFragment}
		}
	}
`;

export function getBlogPost(slug: string) {
	const query = gql`
		query blogPostQuery($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      author {
        node {
          name
          avatar {
            foundAvatar
            rating
            height
            width
            url
          }
        }
      }
      content
      excerpt
      dateGmt
      tags {
        nodes {
          ${tagLinkFragment}
        }
      }
    }
  }`;

	return request(import.meta.env.WORDPRESS_API_URL, query, { id: slug });
}

export function getTagArchive(slug: string) {
	const query = gql`
		query tagArchiveQuery($id: ID!) {
			tag(id: $id, idType: SLUG) {
				name
				count
				posts {
					nodes {
						${archivePostFragment}
					}
				}
			}
		}
	`;

	return request(import.meta.env.WORDPRESS_API_URL, query, { id: slug });
}
