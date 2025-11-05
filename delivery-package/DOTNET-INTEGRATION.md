# .NET MVC Integration Guide

This guide explains how to integrate the SeriousERP Multi-Step Form component into your .NET Core MVC/Razor application.

## Build the Component

Run the build command to generate the UMD bundle:

```bash
npm run build
```

This creates two files in the `dist/` folder:
- `serious-erp-form.umd.js` (~965KB)
- `serious-erp-form.css` (~686KB)

## Integration Steps

### 1. Copy Files to Your .NET Project

Copy the built files to your ASP.NET Core project's `wwwroot` folder:

```
YourProject/
├── wwwroot/
│   ├── lib/
│   │   └── serious-erp-form/
│   │       ├── serious-erp-form.umd.js
│   │       └── serious-erp-form.css
```

### 2. Reference in Layout or View

Add the CSS and JavaScript references to your `_Layout.cshtml` or individual view:

```html
<!-- In the <head> section -->
<link rel="stylesheet" href="~/lib/serious-erp-form/serious-erp-form.css" />

<!-- Before closing </body> tag -->
<script src="~/lib/serious-erp-form/serious-erp-form.umd.js"></script>
```

### 3. Add Container Element in Your Razor View

**Option A: Auto-mount (Recommended)**

Simply add a div with the `data-serious-erp-form` attribute:

```html
<div id="serious-erp-form-container" data-serious-erp-form></div>
```

The form will automatically mount when the page loads.

**Option B: Manual mount**

Add a container div and manually mount the component:

```html
<div id="serious-erp-form-container"></div>

<script>
  // Mount after page loads
  document.addEventListener('DOMContentLoaded', function() {
    SeriousERPForm.mount('serious-erp-form-container');
  });
</script>
```

## Advanced Usage

### Passing Props/Configuration

You can pass configuration to the form component:

```html
<div id="serious-erp-form-container"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    SeriousERPForm.mount('serious-erp-form-container', {
      // Future: Add custom props here if needed
      // onSubmit: function(data) { console.log(data); }
    });
  });
</script>
```

### Multiple Forms on One Page

Each form needs a unique ID:

```html
<div id="form-1" data-serious-erp-form></div>
<div id="form-2" data-serious-erp-form></div>
```

### Unmounting

If you need to programmatically unmount the component:

```javascript
var formInstance = SeriousERPForm.mount('serious-erp-form-container');

// Later, to unmount:
SeriousERPForm.unmount(formInstance);
```

## Controller Integration (Optional)

To handle form submissions in your .NET backend, create a controller endpoint:

```csharp
[HttpPost]
[Route("api/demo/submit")]
public async Task<IActionResult> SubmitDemoRequest([FromBody] DemoRequestModel model)
{
    // Validate the model
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Process the submission
    // - Save to database
    // - Send email notifications
    // - Integrate with CRM

    return Ok(new { success = true, message = "Demo request submitted successfully!" });
}

public class DemoRequestModel
{
    // Step 1: Contact Information
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Company { get; set; }
    public string JobTitle { get; set; }
    public bool ConsentGiven { get; set; }

    // Step 2: Current Software
    public List<string> CurrentSoftware { get; set; }
    public int CsrCount { get; set; }
    public int BillerCount { get; set; }
    public int DispatcherCount { get; set; }
    public int WarehouseCount { get; set; }
    public decimal EquipmentLossValue { get; set; }
    public string PainPoints { get; set; }

    // Step 3: Business Information
    public string HasEquipmentRental { get; set; }
    public string HasFacilityBilling { get; set; }
    public string HasInsuranceBilling { get; set; }
    public int TechnicianCount { get; set; }
    public int DriverCount { get; set; }
    public int PatientCensus { get; set; }
}
```

## CORS Configuration (If Needed)

If your API is on a different domain/port, configure CORS in `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactForm", policy =>
    {
        policy.WithOrigins("https://yourdomain.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// After builder.Build()
app.UseCors("AllowReactForm");
```

## File Size Optimization

The bundle includes React, ReactDOM, and all Kendo components (~965KB uncompressed, ~285KB gzipped).

To reduce size in production:

1. **Enable gzip compression** in your .NET app (`Program.cs`):

```csharp
using Microsoft.AspNetCore.ResponseCompression;

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<GzipCompressionProvider>();
});

app.UseResponseCompression();
```

2. **Enable static file caching** in `Program.cs`:

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append(
            "Cache-Control", "public,max-age=31536000");
    }
});
```

## Troubleshooting

### Form Not Appearing

1. Check browser console for JavaScript errors
2. Verify both CSS and JS files are loaded (Network tab in DevTools)
3. Ensure the container div has a valid `id` attribute
4. Confirm `SeriousERPForm` global object exists: `console.log(window.SeriousERPForm)`

### Styling Issues

1. Ensure CSS file is loaded before JS file
2. Check for CSS conflicts with existing .NET site styles
3. The form uses Kendo Bootstrap theme - may need to adjust if your site uses different Bootstrap version

### API Submission Failing

1. Check Network tab for the API request/response
2. Verify CORS is configured if API is separate domain
3. Check .NET controller accepts JSON (`[FromBody]`)
4. Ensure endpoint URL matches: `/api/demo/submit`

## Example Razor Page

Here's a complete example of a Razor page with the form:

```cshtml
@{
    ViewData["Title"] = "Request Demo";
}

<link rel="stylesheet" href="~/lib/serious-erp-form/serious-erp-form.css" />

<div class="container mt-5">
    <div class="row">
        <div class="col-md-12">
            <h1>Request a SeriousERP Demo</h1>
            <p class="lead">Fill out the form below to schedule your personalized demo.</p>

            <div id="serious-erp-form-container" data-serious-erp-form></div>
        </div>
    </div>
</div>

@section Scripts {
    <script src="~/lib/serious-erp-form/serious-erp-form.umd.js"></script>
}
```

## Next Steps

1. Copy the build files to your .NET project
2. Add the references to your layout or view
3. Add the container div where you want the form to appear
4. Create a controller endpoint to handle form submissions
5. Test the integration locally
6. Deploy to your staging/production environment

For questions or issues, refer to the component's source code in `src/components/multi-step-form/`.
