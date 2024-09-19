using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidebar.TagHelpers.Sidebar
{
    [HtmlTargetElement("sidebar-footer")]
    [RestrictChildren("sidebar-link", "sidebar-dropdown")]
    public class SidebarFooterTagHelper : TagHelper
    {
        public override void Init(TagHelperContext context)
        {
            context.Items[SidebarContext.Parent] = SidebarParent.Footer;
            context.Items[SidebarContext.Section] = SidebarSection.Footer;
        }

        public async override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div";
            output.Attributes.SetAttribute("class", "sidebar-footer");

            var children = await output.GetChildContentAsync();
            output.Content.AppendHtml(children);
        }
    }
}
