import { graphql, useStaticQuery } from "gatsby";

const useGallery = () => {

  const data = useStaticQuery(
        graphql`
        query CloudinaryImage {
            allCloudinaryMedia {
            edges {
                node {
                    secure_url
                    resource_type
                }
            }
            }
        }`
    );

  return data.allCloudinaryMedia.edges;
};

export default useGallery;