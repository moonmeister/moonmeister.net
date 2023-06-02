import { request, gql } from "graphql-request";

export function getFooterMenu() {
	const query = gql`
	query socialMenu{
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
	}`

	return request(import.meta.env.WORDPRESS_API_URL, query)
}

export function getHeaderMenu() {
	const query = gql`
	query mainMenu{
		menu(id: "main-menu", idType: LOCATION) {
			menuItems {
				nodes {
					title
					url
					label
				}
			}
		}
	}`;

	return request(import.meta.env.WORDPRESS_API_URL, query)
}

export function getHomePage() {
	const query = gql`
	query homePage{
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
  }`;

	return request(import.meta.env.WORDPRESS_API_URL, query)
}
