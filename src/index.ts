import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const server = new McpServer({
  name: "ardoqMCP",
  description: "A server that provides ardoq facts.",
  version: "1.0.0",
  tools: [
    {
      name: "get-ardoq-fact",
      description: "Get a random Ardoq fact",
      parameters: {},
    },
  ],
});

const ardoq_facts = [
  "Change what you're seeing using Perspectives",
  "Create shortcuts to frequently used Workspaces and Filters using Presentations",
  "Find the in-app chat in the left menu bar",
  "Expand the hierarchy in the navigator using right click",
  "Create deployment diagrams in the dependency map with group by reference",
  "Multiselect edits in the navigator using CTRL + Click",
  "Create references quickly using the Dependency Matrix",
  "Navigate in-app using Presentations. Click on the slides in edit mode to move between different views!",
  "Create better visualizations by using Drag and Drop icons (.svg is best) onto your components",
  "Ardoq supports Emojis 🤩",
  "Use right click on components and references in Ardoq",
  "Accidentally deleted components or references? Don't stress! You can restore them in Ardoq within one hour",
  "Switch between slides in Presentations with your arrow keys",
  "Create many references in one go using CTRL + Click and the reference button",
  "You can embed public presentations on intranet sites like Sharepoint and Confluence",
  "Hide filtered objects in the navigator by clicking the circle at the top",
  'Find the Ardoq knowledge base by clicking on the "?" in the left menu bar',
  "Sorting of the table view is possible in Presentations",
  'Set your date and number format in "Your account settings"',
  "Create references across Workspaces in the Excel importer",
  "You can copy Presentations",
  "URL links (fields) will show on References and Components in Presentations",
  "Surveys allows anyone to update their data without having to learn Ardoq",
  "Already have Surveys or saved searches? Then check out Dashboards!",
  "Markdown is possible in survey help text sections",
  'Highlight different components is a view with the filtering option. Use, for example, "Has reference to" and "Has reference from"',
  "Survey descriptions support formatting in markdown",
  "Show full hierarchy by right-clicking on the arrow next to Workspace or Component name in the navigator",
  "Add data manually in an Excel-like interface by using the Grid Editor",
  "Visit the Ardoq online Community to discuss and connect with other users",
  "Check out the different options for importing data",
  "Add Dashboards to your presentations",
  'Use specific names for your references. For example: "System realizes capability"',
  "Show reference types or fields in the boxes in dependency map (toggle on at the top)",
  "Use markdown in the Presentation slides' descriptions. Try #, ## and ### before your text.",
  "See an object's incoming and outgoing references with the Capability Map visualization",
  "Check out Ardoq's Roadmap in the Product Portal via the Help menu in the bottom-left",
  "Ardoq works best on a Chrome browser",
  "Need insights from big data sets? Take a look at Relationships view.",
  "Drag your image icon onto your Block Diagram visualization",
  "Use icons to make your content more engaging, visually appealing, and easier to understand",
  "Want your applications strategically rated? Check out our Application Best Practices.",
  "Check out our Data Lineage Best Practice to see how data entities relate to applications, business capabilities, and owners",
  "Copy a slide from one presentation to another using the More Actions menu of the slide",
  "You can get data in Ardoq in three different ways: manually via grid editor, using integrations, or surveys",
  "Create Ardoq Discover viewpoints to help stakeholders in your organization find answers to their specific questions",
  "Run repeating broadcasts with a one-hour frequency to enable continuous workflows",
  "Send a broadcast immediately using the three-dot menu",
  "Help Ardoq load faster by limiting the number of workspaces open in your browser",
  '"Explore" in Presentation helps you dive deeper into the insights on your slides',
  "Invite users to explore Discover's insights by sending out broadcasts with surveys enabled in Discover ",
  "Default viewpoints in Discover help to pick the view a user sees",
  "Navigate to the Discover section of a survey builder to enable it on the viewpoint pages of Discover",
  "Increase recipient engagement by customizing your broadcast message",
  "Discover Viewpoint is a predefined view template designed to answer a specific question of a particular user",
  "Stakeholders in your organization can explore insights using the search in Ardoq Discover",
  "Discover users can find components using the quick search menu on the top right of a viewpoint page",
  "Contact Ardoq admins using the Contact admin button on the top right menu of a Discover viewpoint page",
  "Rearrange fields of the left sidebar of the viewpoint in Discover page using drag and drop",
  "Did you know Scenarios Merge Workflow can combine duplicate components and references?",
  'Tidy up your portfolio by selecting two or more components, right click, and choose "Merge components"',
  "Merge duplicate components and references into one to maintain good quality data",
  "Use Scenarios to build application roadmaps",
  "Model alternative futures using Scenarios",
  "Use Scenarios to model the impact of change",
  "Design alternative futures and evaluate their impact using Scenarios",
  "Meet your business goals by using Scenarios to evaluate the impact of multiple future states",
  "Model multiple future states while protecting your mainline data with Scenarios",
  "Design potential future states and keep sight of the ever-changing reality with Scenarios",
  "Safely model changes in isolation while connected to your current state architecture with Scenarios",
  "Use Scenarios to better understand the impact of change and simulate and compare current and future states",
  "You can safely make changes by branching any part of your architecture and creating an isolated instance of your As-Is",
  "Use Scenarios to model changes with live data",
  "See what future states could look like with up-to-date data using Scenarios",
  "Keep on top of changing strategic priorities by modeling any number of scenarios",
  "Easily recreate planned changes in your As-Is environment with Scenarios’ Data Merge Workflow.",
  "Use Scenarios to rapidly model multiple future states and compare outcomes",
  "Modeling multiple scenarios to find the best solutions can help you meet your strategic objectives",
  "Find the best path forward to achieve your business goals by modeling and comparing multiple scenarios.",
  "Analyze different scenarios to help you understand the impact of change and make better informed decisions",
  "Break down data silos by using reports. Reports mean everyone sees the same data, regardless of their workspace permissions",
  "Build trust in analytics and say farewell to data silos with Ardoq Reports",
  "Advanced search helps you find components or references of a particular type or with specific field values",
  "Analyze the relationships between the components in your graph data model, and their properties using Gremlin graph search.",
  "Invite key stakeholders to a report and keep control of who has access to your data",
  "Calculate aggregated data in reports in just a few clicks",
  "Extract interesting insights from your report by choosing different ways to slice and dice your data",
  "Visualize data and communicate critical metrics and actionable insights by adding reports to a dashboard",
  "Drill down Gremlin dashboard widgets regardless of your user role",
  "Create Pie Chart and Table widgets for Gremlin-based reports",
  "Click on a particular Pie Chart slice to reveal what's underneath",
  "Copy individual dashboards from the Home page or Dashboards Overview page",
  "You don't always have to create a report. Simply run ad-hoc Advanced and Gremlin searches from the Analytics menu",
  "Customize how you present your data by dragging and dropping fields in the Report Builder",
  'Make your reports even clearer by adding the "Description" field as a column',
  "Hover over a component’s description in the Report Reader and quickly get the information you need",
  "Give your reports more context by displaying referenced components and their type",
  "Reference components in your report to better understand connections and dependencies",
  "Visualize referenced components in your report by adding reference types in the Report Builder",
  "Use the Discover privilege to keep track of which users have access to Discover",
  "Restrict who has access to Discover by enabling the Discover privilege on single users only",
  "Filter users by their role and privilege to track who has access to a given functionality",
  "Make sure only selected Contributors have access to presentations and surveys by adding them to a permission group",
  "Manage access for all your users regardless of their role by adding them to a permission group",
  'Check how many users there are in your organization by checking the "Invite and manage users" tab',
  "Subscribe to our Product Newsletter through Preferences > Email preferences to stay updated on all the latest product changes",
  "Learn about the latest product improvements by subscribing to Ardoq's Product Newsletter from Preferences > Email preferences",
  "Be among the first to know about all the new features we've built for you by signing up for our Product Newsletter",
  "Subscribe to our Product Newsletter by heading to Preferences > Email preferences",
  "Get the latest product updates by signing up to our Product Newsletter from Preferences > Email preferences.",
  "Stay current with a recap of our new additions by subscribing to our monthly Product Newsletter",
  "Find out what we've built for you by joining our monthly Product Newsletter",
];

const getArdoqFact = server.tool(
  "get-ardoq-fact",
  "Get a random Ardoq fact.",
  async () => {
    return {
      content: [
        {
          type: "text",
          text: ardoq_facts[Math.floor(Math.random() * ardoq_facts.length)],
        },
      ],
    };
  }
);

const app = express();

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports: { [sessionId: string]: SSEServerTransport } = {};

app.get("/sse", async (req: Request, res: Response) => {
  // Get the full URI from the request
  const host = req.get("host");

  const fullUri = `https://${host}/ardoq`;
  const transport = new SSEServerTransport(fullUri, res);

  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/ardoq", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send("No transport found for sessionId");
  }
});

app.get("/", (_req, res) => {
  res.send("The Ardoq MCP server is running!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
