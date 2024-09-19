using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidebar.TagHelpers.Sidebar
{
    [HtmlTargetElement("sidebar")]
    [RestrictChildren("sidebar-content", "sidebar-footer")]
    public class SidebarTagHelper : TagHelper
    {
        public override void Init(TagHelperContext context)
        {
            context.Items[SidebarContext.Parent] = SidebarParent.Root;
            context.Items[SidebarContext.Section] = SidebarSection.Content; // Defaulting to content
        }

        public override async void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "nav";
            output.Attributes.SetAttribute("id", "sidebar");
            output.Attributes.SetAttribute("class", "sidebar sidebar-minimized");
            output.Attributes.SetAttribute("data-bs-theme", "dark");

            var children = await output.GetChildContentAsync();
            output.Content.AppendHtml(children);

            output.PostElement.AppendHtml(BuildJS());
        }

        public string BuildJS()
        {
            return "<script type=\"module\"> if (Sidebar) { Sidebar.Sidebar.fromHTML(document.getElementById(\"sidebar\")); } else { document.addEventListener(\'DOMContentLoaded\', function () { Sidebar.Sidebar.fromHTML(document.getElementById(\"sidebar\")); }, false); }</script>";
        }
    }
}
