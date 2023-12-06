import { Box, Typography } from "@mui/material";
import AppBarLoggedOut from "../components/app-bar/appBarLoggedOut";
import { Container } from "@mui/material";
import { List } from "@mui/material";
import { ListItemText } from "@mui/material";

export default function Privacy() {
  return (
    <>
      <style>{"body { background-color: #f5f5f5; }"}</style>
      <AppBarLoggedOut></AppBarLoggedOut>

      <Box component="main">
        <Container maxWidth="md" sx={{ mt: "4rem" }}>
          <Typography variant="h2">
            <Box textAlign={"center"} fontWeight={"bold"}>
              Privacy Policy
            </Box>
          </Typography>
          <br></br>
          <br></br>
          <Box component={"section"} id="privacy-information-we-collect">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>What information do we collect?</Box>
            </Typography>
            <br></br>
            <Typography variant="body1">
              We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill
              out a form.
            </Typography>
            <br></br>
            <Typography variant="body1">
              When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address, phone
              number, credit card information or social security number. You may, however, visit our site anonymously. Google, as a third party
              vendor, uses cookies to serve ads on your site. Google&apos;s use of the DART cookie enables it to serve ads to your users based on
              their visit to your sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and
              content network privacy policy.
            </Typography>
          </Box>
          <br></br>
          <Box component={"section"} id="privacy-information-use">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>What do we use your information for?</Box>
            </Typography>
            <br></br>
            <Typography variant="body1">Any of the information we collect from you may be used in one of the following ways:</Typography>
            <br></br>
            <List sx={{ listStyleType: "disc", pl: 4 }}>
              <ListItemText sx={{ display: "list-item" }}>
                To personalize your experience. Your information helps us to better respond to your individual needs.
              </ListItemText>
              <ListItemText sx={{ display: "list-item" }}>
                To improve our website. We continually strive to improve our website offerings based on the information and feedback we receive from
                you.
              </ListItemText>
              <ListItemText sx={{ display: "list-item" }}>
                To improve customer service. Your information helps us to more effectively respond to your customer service requests and support
                needs.
              </ListItemText>
              <ListItemText sx={{ display: "list-item" }}>To process transactions</ListItemText>
            </List>
            <br></br>
            <Typography variant="body1">
              Your information, whether public or private, will not be sold, exchanged, transferred, or given to any other company for any reason
              whatsoever, without your consent, other than for the express purpose of delivering the purchased product or service requested, to
              administer a contest, promotion, survey or other site feature or to send periodic emails.
            </Typography>
            <br></br>
            <Typography variant="body1">
              The email address you provide for order processing, may be used to send you information and updates pertaining to your order, in
              addition to receiving occasional company news, updates, related product or service information, etc.
            </Typography>
            <br></br>
            <Typography variant="body1">
              <span className="font-bold">Note:</span> If at any time you would like to unsubscribe from receiving future emails, we include detailed
              unsubscribe instructions at the bottom of each email.
            </Typography>
          </Box>
          <br></br>
          <Box component={"section"} id="privacy-protection">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>How do we protect your information?</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit,
            or access your personal information.
          </Typography>
          <br></br>
          <Typography variant="body1">
            We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and
            then encrypted into our Database to be only accessed by those authorized with special access rights to our systems, and are required
            to?keep the information confidential.
          </Typography>
          <br></br>
          <Typography variant="body1">
            After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be kept on file for more
            than 60 days.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-cookies">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Do we use cookies?</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            Yes. Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you
            allow them) that enable the sites or service providers systems to recognize your browser and capture and remember certain information.
          </Typography>
          <br></br>
          <Typography variant="body1">
            We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits,
            keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can offer better site
            experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site
            visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve
            our business.
          </Typography>
          <br></br>
          <Typography variant="body1">
            If you prefer, you can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies
            via your browser settings. Like most websites, if you turn your cookies off, some of our services may not function properly. However, you
            can still place orders over the telephone or by contacting customer service.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-disclose-third-party">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Do we disclose any information to outside parties?</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted
            third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep
            this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce
            our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be
            provided to other parties for marketing, advertising, or other uses.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-third-party-links">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Third party links</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have
            separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked
            sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-california">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>California Online Privacy Protection Act Compliance</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection
            Act. We therefore will not distribute your personal information to outside parties without your consent.
          </Typography>
          <br></br>
          <Typography variant="body1">
            As part of the California Online Privacy Protection Act, all users of our site may make any changes to their information at anytime by
            logging into their control panel and going to the &apos;Edit Profile&apos; page.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-coppa-complicance">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Children&apos;s Online Privacy Protection Act Compliance</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act), we do not collect any information from
            anyone under 13 years of age. Our website, products and services are all directed to people who are at least 13 years old or older.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-online">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Online Privacy Policy Only</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            This online privacy policy applies only to information collected through our website and not to information collected offline.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-consent">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Your Consent</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">By using our site, you consent to our web site privacy policy.</Typography>
          <br></br>
          <Box component={"section"} id="privacy-changes">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Changes to our Privacy Policy</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            If we decide to change our privacy policy, we will post those changes on this page, send an email notifying you of any changes, and/or
            update the Privacy Policy modification date below.
          </Typography>
          <br></br>
          <Box component={"section"} id="privacy-contact-us">
            <Typography variant="h6" fontWeight={"bold"}>
              <Box>Contacting Us</Box>
            </Typography>
          </Box>
          <br></br>
          <Typography variant="body1">
            If there are any questions regarding this privacy policy you may contact us using the information below.
          </Typography>
          <br></br>
          <Box className="site-address" sx={{ fontStyle: "italic" }}>
            <Typography variant="body1" className="url">
              http://headlinefights.com
            </Typography>
            <Typography variant="body1" className="name">
              Tru Mega Lab LLC
            </Typography>
            <Typography variant="body1" className="email">
              contact@trumegalab.com
            </Typography>
            <Typography variant="body1" className="country">
              United States
            </Typography>
          </Box>
          <br></br>
        </Container>
      </Box>
    </>
  );
}
