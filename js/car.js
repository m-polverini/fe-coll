$(function () {
	$.ajax({
		dataType: "json",
		url: "http://localhost:8080/vehicles",
		success: function (result) {
			console.log(result);
			if (result) {
				let table = $("#table").bootstrapTable({
					pagination: true,
					search: true,
					sortable: true,
					columns: [
						{
							field: "name",
							title: "Name",
							sortable: true,
						},
						{
							field: "prodFrom",
							title: "From",
							sortable: true,
						},
						{
							field: "prodTo",
							title: "To",
							sortable: true,
						},
						{
							field: "typeVehicle.typeVehicle",
							title: "Type",
							sortable: true,
						},
						{
							field: "engine.power",
							title: "Power",
							sortable: true,
						},
						{
							field: "engine.typeEngine.typeEngine",
							title: "Type Engine",
							sortable: true,
						},
						{
							field: "wheel.sizeWheel.sizeWheel",
							title: "Size Wheels",
							sortable: true,
						},
						{
							field: "wheel.typeWheel.typeWheel",
							title: "Type Wheels",
							sortable: true,
						},
						{
							title: "Actions",
							formatter: function (item, row) {
								return `<button class="btn btn-primary" onclick="openModal('${row.idVehicle}')">Show</button>`;
							},
						},
					],
					data: result,
				});
			}
		},
	});
});

function openModal(idVehicle) {
	$.ajax({
		dataType: "json",
		url: `http://localhost:8080/vehicles/${idVehicle}`,
		success: function (result) {
			$("#nameVehicle").html(
				`<span>Vehicle:</span> <strong>${result.name}</strong>`
			);
			$("#prodFrom").html(
				`<span>From:</span> <strong>${
					result.prodFrom ? result.prodFrom : "-"
				}</strong>`
			);
			$("#prodTo").html(
				`<span>To:</span> <strong>${
					result.prodTo ? result.prodTo : "Actual"
				}</strong>`
			);
			$("#typeVehicle").html(
				`<span>Type Vehicle:</span> <strong>${result.typeVehicle.typeVehicle}</strong>`
			);
			$("#power").html(
				`<span>Power:</span> <strong> ${result.engine.power}</strong>`
			);
			$("#typeEngine").html(
				`<span>Type Engine:</span> <strong> ${result.engine.typeEngine.typeEngine}</strong>`
			);
			$("#sizeWheel").html(
				`<span>Size Wheel:</span> <strong> ${result.wheel.sizeWheel.sizeWheel}</strong>`
			);
			$("#typeWheel").html(
				`<span>Type Wheel:</span> <strong> ${result.wheel.typeWheel.typeWheel}</strong>`
			);
			$("#submodels").bootstrapTable("destroy");
			var table = $("#submodels").bootstrapTable({
				pagination: true,
				search: true,
				sortable: true,
				columns: [
					{
						field: "name",
						title: "Name",
						sortable: true,
					},
					{
						field: "line",
						title: "Line",
						sortable: true,
					},
					{
						field: "engine.power",
						title: "Power",
						sortable: true,
					},
					{
						field: "engine.typeEngine.typeEngine",
						title: "Type Engine",
						sortable: true,
					},
					{
						field: "wheel.sizeWheel.sizeWheel",
						title: "Size Wheels",
						sortable: true,
					},
					{
						field: "wheel.typeWheel.typeWheel",
						title: "Type Wheels",
						sortable: true,
					},
				],
				data: result.vehicles,
			});
		},
	});
	var modal = new bootstrap.Modal($("#exampleModal"));
	modal.show();
}
