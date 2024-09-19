using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidebar.TagHelpers.Sidebar
{
    [HtmlTargetElement("sidebar-content")]
    [RestrictChildren("sidebar-link", "sidebar-dropdown")]
    public class SidebarContentTagHelper : TagHelper
    {
        public override void Init(TagHelperContext context)
        {
            context.Items[SidebarContext.Parent] = SidebarParent.Content;
            context.Items[SidebarContext.Section] = SidebarSection.Content;
        }

        public override async void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div";
            output.Attributes.SetAttribute("class", "sidebar-content");

            output.Content.AppendHtml(BuildToogle());

            var children = await output.GetChildContentAsync();
            output.Content.AppendHtml(children);

            output.Content.AppendHtml(BuildCollapsed());
        }

        private static string BuildToogle()
        {
            return
                "<div class=\"sidebar-row sidebar-toggle-button\">" +
                    "<div class=\"sidebar-item\">" +
                        "<span class=\"sidebar-icon\"><i class=\"bi-arrow-right\"></i></span>" +
                    "</div>" +
                "</div>";
        }

        private static string BuildCollapsed()
        {
            return
                "<div class=\"sidebar-row sidebar-collapsed-button\">" +
                    "<div class=\"sidebar-item\">" +
                        "<span class=\"sidebar-icon\"><i class=\"bi-three-dots\"></i></span>" +
                    "</div>" +
                "</div>";
        }
    }
}
