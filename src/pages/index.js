import React, { Component } from 'react'
import Helmet from 'react-helmet'
import GitHubButton from 'react-github-btn'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projects'
import speaking from '../../data/speaking'
import quotes from '../../data/quotes'
import ahmed from '../../content/images/profile.jpg'

export default class Index extends Component {
  render() {
    const { data } = this.props

    const latestPostEdges = data.latest.edges
    const popularPostEdges = data.popular.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Full Stack Software Engineer`}  />
        <SEO />
        <div className="container">
          <div className="lead">
            <div className="elevator">
              <h2>{`Hi,I'm Basiit 👋`} </h2>
              <p>
                {` I build website, mobile app`}
              {' I'm a developer and designer. I created this site to document everything I learn, and share a bit of myself with the world.'}
              </p>
              <div className="social-buttons">
                <GitHubButton
                  href="https://github.com/abdulbasid10053"
                  data-size="large"
                  data-show-count="true"
                >
                  Basiit_abdul
                </GitHubButton>
              </div>
            </div>
            <div className="newsletter-section">
              <img src={ahmed} className="newsletter-avatar" alt="Ahmed" />
            </div>
          </div>
        </div>

        <div className="container front-page">
          <section className="section">
            <h2>
              Latest Blogs
              <Link to="/blog" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

     
          <section className="section">
            <h2>My Recent Projects 🤪</h2>
            <ProjectListing projects={projects} />
          </section>

  
        </div>
        <div className="gradient-section">
          <div className="container">
            <h2>Other People Say...</h2>
          </div>
          <div className="quotations">
            {quotes.map(quote => (
              <blockquote className="quotation" key={quote.name}>
                <p>{quote.quote}</p>
                <cite>— {quote.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 9
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`
